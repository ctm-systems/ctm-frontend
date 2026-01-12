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

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

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
const gerarOrcamentoPDF = async (orcamento: Orcamento) => {
  if (!client.value || !orcamento) {
    console.error('Dados insuficientes para gerar o PDF')
    return
  }

  const doc = new jsPDF()

  try {
    // Configurações de cores
    const primaryColor: [number, number, number] = [41, 128, 185] // Azul
    const grayColor: [number, number, number] = [149, 165, 166]

    // CABEÇALHO
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 35, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.text('ORÇAMENTO', 105, 15, { align: 'center' })

    // CORREÇÃO AQUI: Garantir que o ID existe antes do toString
    const idFormatado = orcamento.id ? orcamento.id.toString().padStart(6, '0') : '000000'
    const numExibicao = orcamento.identificacao || idFormatado

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Nº ${numExibicao}`, 105, 25, { align: 'center' })

    // Reset cor do texto
    doc.setTextColor(0, 0, 0)

    // INFORMAÇÕES DO CLIENTE
    let yPos = 45

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('DADOS DO CLIENTE', 20, yPos)

    // Linha separadora
    doc.setDrawColor(...grayColor)
    doc.setLineWidth(0.5)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    const clientData: Array<[string, any]> = [
      ['Nome:', client.value.nome],
      ['CPF/CNPJ:', client.value.cpf || client.value.cnpj],
      ['Telefone:', client.value.telefone],
      ['E-mail:', client.value.email],
      ['Endereço:', client.value.endereco],
      ['CEP:', client.value.cep],
      ['Técnico:', tecnicoResponsavel.value],
    ]

    clientData.forEach(([label, value]) => {
      // console.log(`Gerando linha PDF - Label: ${label}, Value:`, value);
      // Garantimos que 'label' e 'value' sejam strings e nunca undefined/null
      const safeLabel = String(label || '')
      const safeValue = String(value || 'N/A')

      doc.setFont('helvetica', 'bold')
      doc.text(safeLabel, 20, yPos)

      doc.setFont('helvetica', 'normal')
      doc.text(safeValue, 55, yPos)

      yPos += 6
    })

    // INFORMAÇÕES DO ORÇAMENTO
    yPos += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('INFORMAÇÕES DO ORÇAMENTO', 20, yPos)

    doc.setDrawColor(...grayColor)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)

    // Mapear status para texto legível
    const statusTexto = {
      [StatusOrcamento.PENDENTE]: 'Pendente',
      [StatusOrcamento.APROVADO]: 'Aprovado',
      [StatusOrcamento.RECUSADO]: 'Recusado',
    }

    const orcamentoData: Array<[string, string]> = [
      [
        'Data de Criação:',
        orcamento.createdAt ? new Date(orcamento.createdAt).toLocaleDateString('pt-BR') : 'N/A',
      ],
      ['Status:', statusTexto[orcamento.status] || 'Não definido'], // Fallback se o status for inválido
      ['Validade:', '30 dias'],
    ]

    orcamentoData.forEach(([label, value]) => {
      // GARANTIA TOTAL: Converte para String e remove nulos
      const sLabel = String(label || '')
      const sValue = String(value || '')

      doc.setFont('helvetica', 'bold')
      doc.text(sLabel, 20, yPos)

      doc.setFont('helvetica', 'normal')
      doc.text(sValue, 55, yPos)

      yPos += 6
    })

    // TABELA DE AMOSTRAS
    yPos += 5
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...primaryColor)
    doc.text('AMOSTRAS PARA ANÁLISE', 20, yPos)

    doc.setDrawColor(...grayColor)
    doc.line(20, yPos + 2, 190, yPos + 2)

    yPos += 7

    // TABELA DE AMOSTRAS - Proteção na data e valores
    const amostrasDoOrcamento = orcamento.amostras || []
    const tableData = amostrasDoOrcamento.map((amostra, index) => [
      String(index + 1),
      String(amostra.nome || 'N/A'),
      String(amostra.tipoAmostra?.nome || 'N/A'),
      amostra.dataRecebimento
        ? new Date(amostra.dataRecebimento).toLocaleDateString('pt-BR')
        : 'N/A',
      'A definir',
    ])

    autoTable(doc, {
      startY: yPos,
      head: [['#', 'Nome da Amostra', 'Tipo', 'Data Recebimento', 'Observações']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    })

    // OBSERVAÇÕES
    const finalY = (doc as any).lastAutoTable.finalY + 10

    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(...grayColor)
    doc.text('Este orçamento tem validade de 30 dias a partir da data de emissão.', 20, finalY)
    doc.text('Valores e prazos sujeitos a alteração mediante análise técnica.', 20, finalY + 5)

    // RODAPÉ
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...grayColor)
    const footerText =
      'Laboratório de Análises - www.laboratorio.com.br - contato@laboratorio.com.br'
    doc.text(footerText, 105, 285, { align: 'center' })

    // SALVAR PDF - Proteção no nome do arquivo
    const idArquivo = orcamento.identificacao || orcamento.id || 'sem_id'
    const nomeClienteLimpo = (client.value.nome || 'cliente').replace(/\s+/g, '_')
    const nomeArquivo = `orcamento_${idArquivo}_${nomeClienteLimpo}.pdf`

    doc.save(nomeArquivo)
  } catch (err) {
    console.error('Erro crítico ao gerar PDF:', err)
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
                        @click="gerarOrcamentoPDF"
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
