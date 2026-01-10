<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { useRoute } from 'vue-router'
import type { Amostra } from '@/types/Amostra'
import type { Client } from '@/types/Client'

import CardInformationAmostraComponent from '@/components/CardInformationAmostraComponent.vue'

const route = useRoute()
const clientStore = useClientStore()
const amostraStore = useAmostraStore()

const client = ref<Client | null>(null)
const amostra = ref<Amostra | null>(null)
const loading = ref(true)

// Computed para formatar os processos como string
const processosFormatados = computed(() => {
  if (!amostra.value?.processos || amostra.value.processos.length === 0) {
    return 'Nenhum processo vinculado'
  }
  return amostra.value.processos.map((p) => p.nome).join(', ')
})

// Computed para pegar o nome do tipo de amostra
const tipoAmostraNome = computed(() => {
  return amostra.value?.tipoAmostra?.nome || 'N/A'
})

onMounted(async () => {
  const clientId = Number(route.params.id)
  const amostraId = Number(route.params.amostraId)
  if (clientId) {
    const fetchedClient = await clientStore.fetchClientById(clientId, true)
    if (fetchedClient) {
      client.value = fetchedClient
      await amostraStore.fetchAmostras()
      amostra.value = amostraStore.amostras.find((a) => a.id === amostraId) || null
    }
  }
  loading.value = false
})

const arquivos = ref([
  { id: 1, nome: 'Arquivo 1', tipo: 'xlsx' },
  { id: 2, nome: 'Arquivo 2', tipo: 'pdf' },
  { id: 3, nome: 'Arquivo 3', tipo: 'xlsx' },
])
</script>

<template>
  <v-container fluid>
    <v-row v-if="!loading && amostra">
      <v-col cols="12">
        <CardInformationAmostraComponent
          :identificacao="amostra.nome"
          :tipoAmostra="tipoAmostraNome"
          :processos="processosFormatados"
          :foto="amostra.foto"
        />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h6 font-weight-bold">Planilhas</h2>
          </v-col>
          <v-col v-for="arquivo in arquivos" :key="arquivo.id" cols="12" md="3">
            <v-card class="rounded-lg" elevation="2">
              <v-card-text class="d-flex flex-column align-center justify-center h-100">
                <v-icon
                  size="80"
                  :color="arquivo.tipo === 'pdf' ? 'red-darken-2' : 'green-darken-2'"
                  class="mb-2"
                >
                  {{ arquivo.tipo === 'pdf' ? 'mdi-file-pdf-box' : 'mdi-file-excel-box' }}
                </v-icon>
                <span class="text-subtitle-1 font-weight-bold text-center">{{ arquivo.nome }}</span>
              </v-card-text>

              <v-card-actions>
                <v-btn class="text-subtitle-1 text-orange w-100" variant="text"> Baixar </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
        <p>Carregando...</p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="warning"> Amostra não encontrada </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>