<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { useOrcamentoStore } from '@/stores/orcamento'
import type { Client } from '@/types/Client'
import type { Amostra } from '@/types/Amostra'
import type { Orcamento } from '@/types/Orçamento'
import { API_URL } from '@/config/env'

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
      dataRecebimento: '',
      codigoOrcamento: '',
      endereco: '',
      cep: '',
      cpfCnpj: '',
      email: '',
      telefone: '',
    }
  }

  return {
    nome: client.value.nome,
    dataRecebimento: new Date(client.value.createdAt).toLocaleDateString('pt-BR'),
    codigoOrcamento: '', // Esta informação não está no tipo Client, pode vir de outro lugar
    endereco: client.value.endereco,
    cep: client.value.cep,
    cpfCnpj: client.value.cpf || client.value.cnpj || '',
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
    return client.value.tecnicos[0]?.nome
  }

  // Se houver mais de um técnico, mostrar todos separados por vírgula
  return client.value.tecnicos.map((tecnico) => tecnico.nome).join(', ')
})

const activeTab = ref('amostras')
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
          :cpfCnpj="clientInfo.cpfCnpj"
          :cep="clientInfo.cep"
          :endereco="clientInfo.endereco"
          :codigoOrcamento="clientInfo.codigoOrcamento"
          :dataRecebimento="clientInfo.dataRecebimento"
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
                  <v-btn class="text-subtitle-1 text-orange" variant="text">Detalhe</v-btn>
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
                      <v-btn icon="mdi-download" density="compact" variant="text" />
                      <v-btn icon="mdi-chevron-right" density="compact" variant="text" />
                    </v-col>
                  </v-row>
                  <v-select
                    label="Status"
                    :items="['Em preparação', 'Em análise', 'Finalizado', 'Cancelado']"
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
