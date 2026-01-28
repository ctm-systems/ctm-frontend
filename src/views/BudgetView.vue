<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { useOrcamentoStore } from '@/stores/orcamento'
import { onMounted, ref, computed, watch } from 'vue'
import CardDialogComponent from '@/components/CardDialogComponent.vue'

const clientsStore = useClientStore()
const amostrasStore = useAmostraStore()
const orcamentoStore = useOrcamentoStore()

const amostrasSelecionadas = ref<number[]>([])

const form = ref({
  identificacao: '',
  clienteId: null as number | null,
})

onMounted(() => {
  clientsStore.fetchClients()
  amostrasStore.fetchAmostras()
  orcamentoStore.fetchOrcamentos()
})

const amostrasDoCliente = computed(() => {
  if (!form.value.clienteId) return []

  return amostrasStore.amostras.filter(
    amostra => amostra.clienteId === form.value.clienteId
  )
})

const clienteSelecionado = computed(() => {
  if (!form.value.clienteId) return null
  return clientsStore.clients.find(client => client.id === form.value.clienteId)
})

const proximoNumero = computed(() => {
  return String(orcamentoStore.orcamentos.length + 1).padStart(4, '0')
})

const anoAtual = new Date().getFullYear()

const identificacaoAutomatica = computed(() => {
  if (!clienteSelecionado.value) return ''
  return `${proximoNumero.value}/${anoAtual} - ${clienteSelecionado.value.nome}`
})

watch(
  () => form.value.clienteId,
  () => {
    amostrasSelecionadas.value = []
  }
)

watch(
  () => identificacaoAutomatica.value,
  (newValue) => {
    form.value.identificacao = newValue
  },
  { immediate: true }
)

async function adicionarAmostra(budgetId: number) {
  if (!amostrasSelecionadas.value.length) return

  await orcamentoStore.attachAmostraToOrcamento(
    budgetId,
    amostrasSelecionadas.value
  )
}

const loading = ref(false)

const dialogVisible = ref(false)
const dialogMsg = ref<'success' | 'error' | 'none'>('none')

async function saveBudget() {
  if (!form.value.clienteId || !amostrasSelecionadas.value.length) {
    dialogMsg.value = 'error'
    dialogVisible.value = true
    return
  }

  loading.value = true
  try {
    const budget = await orcamentoStore.addOrcamento(form.value)
    if (budget) {
      await adicionarAmostra(budget.id)
      dialogMsg.value = 'success'
    }
  } catch (error) {
    console.error('Erro ao salvar o orçamento:', error)
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
        <span class="text-h6 font-weight-bold">Gerar Orçamento</span>
      </v-col>

      <v-col v-if="dialogVisible" cols="12">
        <CardDialogComponent
          :type="dialogMsg === 'error' ? 'error' : 'success'"
          :title="dialogMsg === 'error' ? 'Falha ao Gerar Orçamento' : 'Orçamento Gerado!'"
        >
          <div v-if="dialogMsg === 'error'">
            <p>Selecione um cliente e pelo menos uma amostra para prosseguir.</p>
          </div>

          <div v-else class="d-flex flex-column ga-1">
            <p>O orçamento foi criado com sucesso.</p>
            <div class="text-caption">
              <strong>Identificação:</strong> {{ form.identificacao }}
            </div>
            <div class="text-caption">
              <strong>Amostras vinculadas:</strong> {{ amostrasSelecionadas.length }}
            </div>
          </div>
        </CardDialogComponent>
      </v-col>

      <v-col cols="12">

        <v-form @submit.prevent="saveBudget">
          <TextInputComponent
            placeholder-props="Identificação do orçamento"
            density="compact"
            v-model="form.identificacao"
            disabled
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

          <v-select
            label="Amostra"
            variant="outlined"
            density="compact"
            :items="amostrasDoCliente"
            item-title="nome"
            item-value="id"
            multiple
            chips
            :disabled="!form.clienteId"
            v-model="amostrasSelecionadas"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit" :loading="loading">Gerar Orçamento</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
