<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { usePlanilhaStore } from '@/stores/planilha'
import { useRoute } from 'vue-router'
import type { Amostra } from '@/types/Amostra'
import type { Client } from '@/types/Client'
import type { Planilha } from '@/types/Planilha'

import CardInformationAmostraComponent from '@/components/CardInformationAmostraComponent.vue'

const route = useRoute()
const clientStore = useClientStore()
const amostraStore = useAmostraStore()
const planilhaStore = usePlanilhaStore()

const client = ref<Client | null>(null)
const amostra = ref<Amostra | null>(null)
const planilhasAmostra = ref<Planilha[]>([])
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

// Método para buscar planilhas da amostra
const fetchPlanilhasAmostra = async (amostraId: number) => {
  try {
    await planilhaStore.fetchPlanilhas()
    planilhasAmostra.value = planilhaStore.planilhas.filter(planilha => planilha.amostraId === amostraId)
  } catch (error) {
    console.error('Erro ao buscar planilhas da amostra:', error)
    planilhasAmostra.value = []
  }
}

// Método para fazer download da planilha
const downloadPlanilha = async (planilha: Planilha) => {
  try {
    console.log('Iniciando download da planilha:', {
      id: planilha.id,
      identificacao: planilha.identificacao,
      amostraId: planilha.amostraId
    })

    const filename = `${planilha.identificacao}.xlsx`
    await planilhaStore.downloadPlanilha(planilha.id, filename)
    console.log('Download realizado com sucesso')
  } catch (error) {
    console.error('Erro ao fazer download da planilha:', error)

    // Tratamento específico para erro 404
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      alert('Arquivo não encontrado. Verifique se a planilha ainda existe.')
    } else {
      alert('Erro ao baixar arquivo. Tente novamente.')
    }
  }
}

onMounted(async () => {
  const clientId = Number(route.params.id)
  const amostraId = Number(route.params.amostraId)
  if (clientId) {
    const fetchedClient = await clientStore.fetchClientById(clientId, true)
    if (fetchedClient) {
      client.value = fetchedClient
      await amostraStore.fetchAmostras()
      amostra.value = amostraStore.amostras.find((a) => a.id === amostraId) || null

      if (amostra.value) {
        await fetchPlanilhasAmostra(amostraId)
      }
    }
  }
  loading.value = false
})
</script>

<template>
  <v-container fluid>
    <v-row v-if="!loading && amostra">
      <v-col cols="12">
        <CardInformationAmostraComponent
          :identificacao="amostra.nome"
          :dataRecebimento="amostra.dataRecebimento"
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
          <v-col v-if="planilhasAmostra.length === 0" cols="12">
            <v-alert type="info" variant="outlined">
              Nenhuma planilha encontrada para esta amostra
            </v-alert>
          </v-col>
          <v-col v-for="planilha in planilhasAmostra" :key="planilha.id" cols="12" md="3">
            <v-card class="rounded-lg" elevation="2">
              <v-card-text class="d-flex flex-column align-center justify-center h-100">
                <v-icon
                  size="80"
                  color="green-darken-2"
                  class="mb-2"
                >
                  mdi-file-excel-box
                </v-icon>
                <span class="text-subtitle-1 font-weight-bold text-center">{{ planilha.identificacao }}</span>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="text-subtitle-1 text-orange w-100"
                  variant="text"
                  @click="downloadPlanilha(planilha)"
                >
                  Baixar
                </v-btn>
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
