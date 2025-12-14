<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
import { useClientsStore } from '@/stores/clients'
import { useTipoAmostraStore } from '@/stores/tipoAmostra';
import { useProcessStore } from '@/stores/process';
import { useAmostrasStore } from '@/stores/amostra';
import { onMounted, ref } from 'vue';
import { createAmostras } from '@/services/amostra.service';

const clientsStore = useClientsStore()
const tipoAmostraStore = useTipoAmostraStore()
const processStore = useProcessStore()
const amostrasStore = useAmostrasStore()

const form = ref({
  foto: null as File | null,
  nome: '',
  clienteId: null as number | null,
  tipoAmostraId: null as number | null,
  dataRecebimento: '',
})

onMounted(() => {
  clientsStore.fetchClients()
  tipoAmostraStore.fetchTipoAmostras()
  processStore.fetchProcesses()
})

async function saveSample() {
  try {
    const sample = await createAmostras(form.value)

    amostrasStore.addAmostra(sample)
  } catch (error) {
    console.error('Erro ao salvar a amostra:', error)
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Cadastrar amostra</span>
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
          />

          <v-select
            label="Tipo de amostra"
            :items="tipoAmostraStore.tipoAmostras"
            item-title="nome"
            item-value="id"
            variant="outlined"
            density="compact"
            v-model="form.tipoAmostraId"
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
          />

          <v-text-field
            label="Data de recebimento"
            type="date"
            variant="outlined"
            density="compact"
            v-model="form.dataRecebimento"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Adicionar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
