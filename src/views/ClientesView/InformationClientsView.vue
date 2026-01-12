<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { useOrcamentoStore } from '@/stores/orcamento'
import type { Client } from '@/types/Client'
import type { Amostra } from '@/types/Amostra'
import { type Orcamento, StatusOrcamento } from '@/types/Orçamento'
import { API_URL } from '@/config/env'
import { gerarOrcamentoPDF } from '@/services/pdf.service'

import CardInformationClientComponent from '@/components/CardInformationClientComponent.vue'

const route = useRoute()
const clientStore = useClientStore()
const amostraStore = useAmostraStore()
const orcamentoStore = useOrcamentoStore()

const client = ref<Client | null>(null)
const amostras = ref<Amostra[]>([])
const orcamentos = ref<Orcamento[]>([])
const loading = ref(true)

// Pegar o ID do cliente da rota e buscar os dados
onMounted(async () => {
  const clientId = Number(route.params.id)
  if (clientId) {
    const fetchedClient = await clientStore.fetchClientById(clientId, true) // true para carregar técnicos
    if (fetchedClient) {
      client.value = fetchedClient
      await amostraStore.fetchAmostras()
      amostras.value = amostraStore.amostras.filter((a) => a.clienteId === clientId)
      await orcamentoStore.fetchOrcamentos()
      orcamentos.value = orcamentoStore.orcamentos.filter((o) => o.clienteId === clientId)
    }
  }
  loading.value = false
})

// Dados do cliente formatados para o componente
const clientInfo = computed(() => {
  if (!client.value) {
    return {
      nome: '',
      dataCadastro: '',
      endereco: '',
      cep: '',
      cpf: '',
      cnpj: '',
      email: '',
      telefone: '',
    }
  }

  return {
    nome: client.value.nome,
    dataCadastro: new Date(client.value.createdAt).toLocaleDateString('pt-BR'),
    endereco: client.value.endereco,
    cep: client.value.cep,
    cpf: client.value.cpf,
    cnpj: client.value.cnpj,
    email: client.value.email,
    telefone: client.value.telefone,
  }
})

// Computed para formatar os nomes dos técnicos
const tecnicoResponsavel = computed(() => {
  if (!client.value?.tecnicos || client.value.tecnicos.length === 0) {
    return 'Nenhum técnico associado'
  }

  if (client.value.tecnicos.length === 1) {
    return client.value.tecnicos[0]?.nome || 'Nenhum técnico associado'
  }

  // Se houver mais de um técnico, mostrar todos separados por vírgula
  return client.value.tecnicos.map((tecnico) => tecnico.nome).join(', ')
})

const activeTab = ref('amostras')

// Mapear os status do enum para os valores de exibição
const statusOptions = [
  { title: 'Pendente', value: StatusOrcamento.PENDENTE },
  { title: 'Aprovado', value: StatusOrcamento.APROVADO },
  { title: 'Recusado', value: StatusOrcamento.RECUSADO },
]

// Função para atualizar o status do orçamento
const updateOrcamentoStatus = async (orcamentoId: number, newStatus: StatusOrcamento) => {
  try {
    await orcamentoStore.updateStatus(orcamentoId, newStatus)
    // Atualizar a lista local também
    const orcamento = orcamentos.value.find((o) => o.id === orcamentoId)
    if (orcamento) {
      orcamento.status = newStatus
    }
  } catch (error) {
    console.error('Erro ao atualizar status do orçamento:', error)
    // Aqui você pode adicionar uma notificação de erro se tiver um sistema de notificações
  }
}

// FUNÇÃO PARA GERAR PDF DO ORÇAMENTO
const handleGerarOrcamentoPDF = async (orcamento: Orcamento) => {
  if (!client.value || !orcamento) {
    console.error('Dados insuficientes para gerar o PDF')
    return
  }

  // Primeiro tenta buscar o orçamento completo com amostras do backend
  try {
    const orcamentoCompleto = await orcamentoStore.fetchOrcamentoById(orcamento.id)
    if (orcamentoCompleto && orcamentoCompleto.amostras?.length > 0) {
      await gerarOrcamentoPDF(orcamentoCompleto, client.value, tecnicoResponsavel.value)
    } else {
      // Se não tiver amostras no orçamento, usar as amostras do cliente como fallback
      await gerarOrcamentoPDF(orcamento, client.value, tecnicoResponsavel.value, amostras.value)
    }
  } catch (error) {
    console.error('Erro ao buscar orçamento completo, usando dados locais:', error)
    // Fallback: usar as amostras do cliente
    await gerarOrcamentoPDF(orcamento, client.value, tecnicoResponsavel.value, amostras.value)
  }
}
</script>

<template>
  <v-container fluid>
    <!-- Loading state -->
    <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 200px">
      <v-progress-circular indeterminate color="orange" size="64" />
    </div>

    <!-- Cliente não encontrado -->
    <div
      v-else-if="!client"
      class="d-flex justify-center align-center flex-column"
      style="min-height: 200px"
    >
      <v-icon size="64" color="grey">mdi-account-off</v-icon>
      <h3 class="mt-3">Cliente não encontrado</h3>
      <v-btn class="mt-3" @click="$router.push({ name: 'clientes' })">
        Voltar para lista de clientes
      </v-btn>
    </div>

    <!-- Dados do cliente -->
    <v-row v-else>
      <v-col cols="12">
        <CardInformationClientComponent
          :nome="clientInfo.nome"
          :email="clientInfo.email"
          :telefone="clientInfo.telefone"
          :cpf="clientInfo.cpf"
          :cnpj="clientInfo.cnpj"
          :cep="clientInfo.cep"
          :endereco="clientInfo.endereco"
          :dataCadastro="clientInfo.dataCadastro"
        />
      </v-col>

      <v-col cols="12">
        <!-- Informações Internas -->
        <div>
          <span class="text-subtitle-1 font-weight-bold mb-4">Técnico(s) Responsável(is): </span>
          <span class="text-subtitle-1">{{ tecnicoResponsavel }}</span>
          <v-divider class="mt-2"></v-divider>
        </div>
      </v-col>

      <v-col cols="12">
        <!-- Seção de Tabs -->
        <div class="d-flex justify-center mb-4">
          <div class="d-flex align-center">
            <v-btn
              :class="
                activeTab === 'amostras'
                  ? 'text-orange font-weight-bold'
                  : 'text-black font-weight-bold'
              "
              variant="text"
              @click="activeTab = 'amostras'"
              class="text-subtitle-1"
            >
              Amostras
            </v-btn>

            <v-divider vertical class="mx-2" style="height: 38px"></v-divider>

            <v-btn
              :class="
                activeTab === 'orcamentos'
                  ? 'text-orange font-weight-bold'
                  : 'text-black font-weight-bold'
              "
              variant="text"
              @click="activeTab = 'orcamentos'"
              class="text-subtitle-1"
            >
              Orçamentos
            </v-btn>
          </div>
        </div>
      </v-col>

      <v-col cols="12">
        <!-- Lista de Amostras -->
        <div v-if="activeTab === 'amostras'">
          <v-row>
            <v-col v-for="amostra in amostras" :key="amostra.id" cols="12" md="3">
              <v-card class="rounded-lg" elevation="2">
                <v-img
                  :src="`${API_URL}${amostra.foto}`"
                  height="150"
                  crossorigin="anonymous"
                  cover
                />
                <v-card-text class="d-flex flex-column text-center">
                  <span class="text-subtitle-1 font-weight-bold mb-2">{{ amostra.nome }}</span>
                  <v-btn
                    class="text-subtitle-1 text-orange"
                    variant="text"
                    @click="
                      $router.push({
                        name: 'detalhes-amostra',
                        params: { id: client.id, amostraId: amostra.id },
                      })
                    "
                    >Detalhe</v-btn
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Conteúdo de Orçamentos (placeholder) -->
        <div v-if="activeTab === 'orcamentos'">
          <v-row>
            <v-col cols="12" md="3" v-for="orcamento in orcamentos" :key="orcamento.id">
              <v-card class="rounded-lg" elevation="2">
                <v-card-text class="d-flex flex-column ga-5">
                  <v-row>
                    <v-col cols="6">
                      <span class="text-subtitle-1 font-weight-bold">{{
                        orcamento.identificacao
                      }}</span>
                    </v-col>
                    <v-col cols="6" class="d-flex ga-2 justify-end">
                      <v-btn
                        icon="mdi-download"
                        density="compact"
                        variant="text"
                        @click="handleGerarOrcamentoPDF(orcamento)"
                      />
                      <v-btn icon="mdi-chevron-right" density="compact" variant="text" />
                    </v-col>
                  </v-row>
                  <v-select
                    label="Status"
                    :items="statusOptions"
                    :model-value="orcamento.status"
                    @update:model-value="(value) => updateOrcamentoStatus(orcamento.id, value)"
                    density="compact"
                    variant="outlined"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-orange {
  color: #e48020;
}

.text-black {
  color: #000000;
}
</style>
