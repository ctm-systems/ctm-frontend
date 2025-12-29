<script setup lang="ts">
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { usePlanilhaStore } from '@/stores/planilha'
import { onMounted } from 'vue'
import { ref, computed, watch } from 'vue'

const clientsStore = useClientStore()
const amostrasStore = useAmostraStore()
const planilhaStore = usePlanilhaStore()

const amostrasSelecionadas = ref<number[]>([])

onMounted(() => {
  clientsStore.fetchClients()
  amostrasStore.fetchAmostras()
})

const form = ref({
  clienteId: null as number | null,
  amostraId: null as number | null,
  arquivo: null as File | null,
  identificacao: '',
})

const amostrasDoCliente = computed(() => {
  if (!form.value.clienteId) return []

  return amostrasStore.amostras.filter(
    amostra => amostra.clienteId === form.value.clienteId
  )
})

watch(
  () => form.value.clienteId,
  () => {
    amostrasSelecionadas.value = []
  }
)

const savePlanilha = async () => {
  try {
    const formData = new FormData()
    if (form.value.clienteId) formData.append('clienteId', form.value.clienteId.toString())
    if (form.value.amostraId) formData.append('amostraId', form.value.amostraId.toString())
    if (form.value.arquivo) formData.append('arquivo', form.value.arquivo)
    if (form.value.identificacao) formData.append('identificacao', form.value.identificacao)

    await planilhaStore.addPlanilha(formData as FormData)
  } catch (error) {
    console.error('Erro ao processar a planilha:', error)
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Tratamento de excel</span>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent="savePlanilha">
          <v-select
            label="Cliente"
            variant="outlined"
            density="compact"
            :items="clientsStore.clients"
            item-title="nome"
            item-value="id"
            v-model="form.clienteId"
          />

          <v-select
            label="Amostra"
            variant="outlined"
            density="compact"
            :items="amostrasDoCliente"
            item-title="nome"
            item-value="id"
            v-model="form.amostraId"
            :disabled="!form.clienteId"
          />

          <v-text-field
            label="Identificação da planilha"
            variant="outlined"
            density="compact"
            v-model="form.identificacao"
            :disabled="!form.clienteId || !form.amostraId"
          />

          <v-file-input
            label="Arquivo Excel"
            variant="outlined"
            icon="mdi-file-edit"
            density="compact"
            title="Arraste ou clique para adicionar arquivo"
            v-model="form.arquivo"
            accept=".xlsx, .xls"
            :disabled="!form.clienteId || !form.amostraId"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end mt-4">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Gerar arquivo</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
