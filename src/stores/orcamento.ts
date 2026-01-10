import { defineStore } from "pinia"
import type { Orcamento } from "@/types/Orçamento"
import { getOrcamentos, createOrcamento, attachAmostra, updateOrcamentoStatus } from "@/services/orcamento.service"

export const useOrcamentoStore = defineStore("orcamento", {
  state: () => ({
    orcamentos: [] as Orcamento[],
  }),
  actions: {
    async fetchOrcamentos() {
      try {
        this.orcamentos = await getOrcamentos()
      } catch (error) {
        console.error("Failed to fetch orçamentos:", error)
      }
    },
    async addOrcamento(payload: Partial<Orcamento>) {
      try {
        const newOrcamento = await createOrcamento(payload)
        this.orcamentos.push(newOrcamento)
        return newOrcamento
      } catch (error) {
        console.error("Failed to create orçamento:", error)
        return undefined
      }
    },
    async attachAmostraToOrcamento(orcamentoId: number, amostraIds: number[]) {
      try {
        await attachAmostra(orcamentoId, amostraIds)
      } catch (error) {
        console.error('Failed to attach amostra to orçamento:', error)
      }
    },
    async updateStatus(orcamentoId: number, status: string) {
      try {
        const updatedOrcamento = await updateOrcamentoStatus(orcamentoId, status)
        const index = this.orcamentos.findIndex(o => o.id === orcamentoId)
        if (index !== -1) {
          this.orcamentos[index] = updatedOrcamento
        }
        return updatedOrcamento
      } catch (error) {
        console.error('Failed to update orçamento status:', error)
        throw error
      }
    },
  },
})
