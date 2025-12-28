import { defineStore } from "pinia"
import type { Planilha } from "@/types/Planilha"
import { getPlanilhas, createPlanilha } from "@/services/planilha.service"

export const usePlanilhaStore = defineStore("planilha", {
  state: () => ({
    planilhas: [] as Planilha[],
  }),
  actions: {
    async fetchPlanilhas() {
      try {
        this.planilhas = await getPlanilhas()
      } catch (error) {
        console.error("Failed to fetch planilhas:", error)
      }
    },
    async addPlanilha(payload: Partial<Planilha> | FormData): Promise<Planilha | undefined> {
      try {
        const newPlanilha = await createPlanilha(payload)
        this.planilhas.push(newPlanilha)
        return newPlanilha
      } catch (error) {
        console.error("Failed to create planilha:", error)
        return undefined
      }
    },
  },
})
