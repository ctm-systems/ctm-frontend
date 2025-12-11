<script setup lang="ts">
import { ref } from 'vue'

import CardInformationClientComponent from '@/components/CardInformationClientComponent.vue'

// Dados do cliente (mockados)
const clientInfo = {
  nome: 'João',
  dataRecebimento: '12/12/2025',
  codigoOrcamento: '0099/2025',
  endereco: 'Rua João, 00, Cidade',
  cep: '00000-000',
  cpfCnpj: '000.000.000-00',
  email: 'joao@email.com',
  telefone: '+55 84 9 9999-9999'
}

const tecnicoResponsavel = 'Maria'

const amostras = [
  { id: 1, image: '#', identificacao: 'Identificação', detalhe: 'Detalhe' },
  { id: 2, image: '#', identificacao: 'Identificação', detalhe: 'Detalhe' },
  { id: 3, image: '#', identificacao: 'Identificação', detalhe: 'Detalhe' },
  { id: 4, image: '#', identificacao: 'Identificação', detalhe: 'Detalhe' },
]

const orcamentos = [
  { id: 1, nome: 'Orçamento X' },
  { id: 2, nome: 'Orçamento Y' },
]

const activeTab = ref('amostras')
</script>

<template>
  <v-container fluid>
    <v-row>
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

      <v-col cols=12>
        <!-- Seção de Tabs -->
        <div class="d-flex justify-center mb-4">
          <div class="d-flex align-center">
            <v-btn
              :class="activeTab === 'amostras' ? 'text-orange font-weight-bold' : 'text-black font-weight-bold'"
              variant="text"
              @click="activeTab = 'amostras'"
              class="text-subtitle-1"
            >
              Amostras
            </v-btn>

            <v-divider vertical class="mx-2" style="height: 38px;"></v-divider>

            <v-btn
              :class="activeTab === 'orcamentos' ? 'text-orange font-weight-bold' : 'text-black font-weight-bold'"
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
            <v-col
              v-for="amostra in amostras"
              :key="amostra.id"
              cols="12"
              md="3"
            >
              <v-card class="rounded-lg" elevation="2">
                <v-img class="bg-red" :src="amostra.image" height="150"/>
                <v-card-text class="d-flex flex-column text-center">
                  <span class="text-subtitle-1 font-weight-bold mb-2">{{ amostra.identificacao }}</span>
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
                      <span class="text-subtitle-1 font-weight-bold">{{ orcamento.nome }}</span>
                    </v-col>
                    <v-col cols="6" class="d-flex ga-2 justify-end">
                      <v-btn icon="mdi-download" density="compact" variant="text"/>
                      <v-btn icon="mdi-chevron-right" density="compact" variant="text"/>
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
  color: #E48020;
}

.text-black {
  color: #000000;
}
</style>
