import { defineStore } from "pinia"
import type { Amostra } from "@/types/Amostra"
import { getAmostras, createAmostras, attachProcessos } from "@/services/amostra.service"

export const useAmostraStore = defineStore("amostra", {
  state: () => ({
    amostras: [] as Amostra[],
  }),
  actions: {
    async fetchAmostras() {
      try {
        this.amostras = await getAmostras()
      } catch (error) {
        console.error("Failed to fetch amostras:", error)
      }
    },
    async addAmostra(payload: Partial<Amostra> | FormData): Promise<Amostra | undefined> {
      try {
        const newAmostra = await createAmostras(payload)
        this.amostras.push(newAmostra)
        return newAmostra
      } catch (error) {
        console.error("Failed to create amostra:", error)
        return undefined
      }
    },
    async attachProcessosToAmostra(amostraId: number, processoIds: number[]) {
      try {
        await attachProcessos(amostraId, processoIds)
      } catch (error) {
        console.error('Failed to attach processos to amostra:', error)
      }
    },
  },
})