<script setup lang="ts">
import { useLaudoStore } from '@/stores/laudo'
import { useClientStore } from '@/stores/clients'
import { useOrcamentoStore } from '@/stores/orcamento'
import { usePlanilhaStore } from '@/stores/planilha'
import { onMounted, ref, watch, computed } from 'vue'

const laudoStore = useLaudoStore()
const clientsStore = useClientStore()
const orcamentoStore = useOrcamentoStore()
const planilhaStore = usePlanilhaStore()

const planilhasSelecionadas = ref<number[]>([])

const form = ref({
  clienteId: null as number | null,
  orcamentoId: null as number | null,
})

onMounted(() => {
  clientsStore.fetchClients()
  orcamentoStore.fetchOrcamentos()
  planilhaStore.fetchPlanilhas()
})

const orcamentoDoCliente = computed(() => {
  if (!form.value.clienteId) return []

  return orcamentoStore.orcamentos.filter(
    orcamento => orcamento.clienteId === form.value.clienteId
  )
})

const planilhaDoCliente = computed(() => {
  if (!form.value.clienteId) return []

  return planilhaStore.planilhas.filter(
    planilha => planilha.clienteId === form.value.clienteId
  )
})

watch(
  () => form.value.clienteId,
  () => {
    planilhasSelecionadas.value = []
  }
)

async function adicionarPlanilha(laudoId: number) {
  console.log('Planilhas selecionadas:', planilhasSelecionadas.value)
  if (!planilhasSelecionadas.value.length) return

  await laudoStore.attachPlanilhasToLaudo(
    laudoId,
    planilhasSelecionadas.value
  )
}

const saveLaudo = async () => {
  try {
    const laudo = await laudoStore.addLaudo(form.value)
    if (laudo) {
      await adicionarPlanilha(laudo.id)
    }
  } catch (error) {
    console.error('Erro ao salvar o laudo:', error)
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerar Laudo</span>
      </v-col>
      <v-col cols="12">

        <v-form @submit.prevent="saveLaudo">
          <v-select
            label="Cliente"
            :items="clientsStore.clients"
            item-title="nome"
            item-value="id"
            v-model="form.clienteId"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Orçamento"
            :items="orcamentoDoCliente"
            item-title="identificacao"
            item-value="id"
            v-model="form.orcamentoId"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Planilha"
            :items="planilhaDoCliente"
            item-title="identificacao"
            item-value="id"
            v-model="planilhasSelecionadas"
            multiple
            chips
            variant="outlined"
            density="compact"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Gerar laudo</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
