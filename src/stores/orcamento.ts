import { defineStore } from "pinia"
import type { Orcamento } from "@/types/Orçamento"
import { getOrcamentos, createOrcamento } from "@/services/orcamento.service"

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
      } catch (error) {
        console.error("Failed to create orçamento:", error)
      }
    },
  },
})