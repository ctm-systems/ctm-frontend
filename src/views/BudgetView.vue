<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
import { useClientStore } from '@/stores/clients'
import { useAmostraStore } from '@/stores/amostra'
import { useOrcamentoStore } from '@/stores/orcamento'
import { onMounted, ref } from 'vue'

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
})

async function adicionarAmostra(budgetId: number) {
  if (!amostrasSelecionadas.value.length) return

  await orcamentoStore.attachAmostraToOrcamento(budgetId, amostrasSelecionadas.value)
}

async function saveBudget() {
  try {
    const budget = await orcamentoStore.addOrcamento(form.value)
    if (budget) {
      await adicionarAmostra(budget.id)
    }
  } catch (error) {
    console.error('Erro ao salvar o orçamento:', error)
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerar Orçamento</span>
      </v-col>
      <v-col cols="12">

        <v-form @submit.prevent="saveBudget">
            <TextInputComponent
                placeholder-props="Identificação do orçamento"
                density="compact"
                v-model="form.identificacao"
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
            :items="amostrasStore.amostras"
            item-title="nome"
            item-value="id"
            multiple
            chips
            v-model="amostrasSelecionadas"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Gerar Orçamento</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
