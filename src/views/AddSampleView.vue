<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
import { useClientStore } from '@/stores/clients'
import { useTipoAmostraStore } from '@/stores/tipoAmostra';
import { useProcessStore } from '@/stores/process';
import { useAmostraStore } from '@/stores/amostra';
import { onMounted, ref } from 'vue';
import CardDialogComponent from '@/components/CardDialogComponent.vue';

const clientsStore = useClientStore()
const tipoAmostraStore = useTipoAmostraStore()
const processStore = useProcessStore()
const amostrasStore = useAmostraStore()

const form = ref({
  foto: null as File | null,
  nome: '',
  clienteId: null as number | null,
  tipoAmostraId: null as number | null,
  dataRecebimento: '',
})

const today = new Date().toISOString().split("T")[0] // yyyy-mm-dd

const processosSelecionados = ref<number[]>([])

onMounted(() => {
  clientsStore.fetchClients()
  tipoAmostraStore.fetchTipoAmostras()
  processStore.fetchProcesses()
})

async function salvarProcessos(amostraId: number) {
  if (!processosSelecionados.value.length) return

  await amostrasStore.attachProcessosToAmostra(amostraId, processosSelecionados.value)
}

const loading = ref(false)

const dialogVisible = ref(false)
const dialogMsg = ref<'success' | 'error' | 'none'>('none')

async function saveSample() {
  if (!form.value.nome || !form.value.clienteId) {
    dialogMsg.value = 'error'
    dialogVisible.value = true
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    formData.append('nome', form.value.nome)
    if (form.value.clienteId) formData.append('clienteId', form.value.clienteId.toString())
    if (form.value.tipoAmostraId) formData.append('tipoAmostraId', form.value.tipoAmostraId.toString())
    formData.append('dataRecebimento', form.value.dataRecebimento)
    if (form.value.foto) formData.append('foto', form.value.foto)

    const sample = await amostrasStore.addAmostra(formData)
    if (sample) {
      await salvarProcessos(sample.id)
      dialogMsg.value = 'success'
    }
  } catch (error) {
    console.error('Erro ao salvar a amostra:', error)
    dialogMsg.value = 'error'
  } finally {
    loading.value = false
    dialogVisible.value = true
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Cadastrar amostra</span>
      </v-col>
      <v-col v-if="dialogVisible" cols="12">
        <CardDialogComponent
          :type="dialogMsg === 'error' ? 'error' : 'success'"
          :title="dialogMsg === 'error' ? 'Erro ao cadastrar' : 'Amostra cadastrada!'"
        >
          <div v-if="dialogMsg === 'error'">
            <p>Não foi possível salvar a amostra. Verifique se todos os campos obrigatórios (*) foram preenchidos corretamente.</p>
          </div>

          <div v-else class="d-flex flex-column">
            <p>A amostra <strong>{{ form.nome }}</strong> foi registrada com sucesso.</p>
            <span class="text-caption">
              Processos vinculados: {{ processosSelecionados.length }}
            </span>
          </div>
        </CardDialogComponent>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent="saveSample">
          <v-file-input
            label="Foto da amostra"
            prepend-icon="mdi-camera"
            variant="outlined"
            density="compact"
            v-model="form.foto"
            accept="image/*"
            :disabled="!form.clienteId"
          />

          <v-select
            label="Cliente"
            :items="clientsStore.clients"
            item-title="nome"
            item-value="id"
            variant="outlined"
            density="compact"
            v-model="form.clienteId"
          />

          <TextInputComponent
            label="Identificação da amostra"
            variant="outlined"
            density="compact"
            v-model="form.nome"
            :disabled="!form.clienteId"
          />

          <v-select
            label="Tipo de amostra"
            :items="tipoAmostraStore.tipoAmostras"
            item-title="nome"
            item-value="id"
            variant="outlined"
            density="compact"
            v-model="form.tipoAmostraId"
            :disabled="!form.clienteId"
          />

          <v-select
            label="Processos"
            :items="processStore.processes"
            item-title="nome"
            item-value="id"
            multiple
            chips
            variant="outlined"
            density="compact"
            v-model="processosSelecionados"
            :disabled="!form.clienteId"
          />

          <v-text-field
            label="Data de recebimento"
            type="date"
            variant="outlined"
            density="compact"
            v-model="form.dataRecebimento"
            :disabled="!form.clienteId"
            :max="today"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit" :loading="loading">Adicionar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
