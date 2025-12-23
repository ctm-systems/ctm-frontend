import { defineStore } from "pinia"
import type { Amostra } from "@/types/Amostra"
import { getAmostras, createAmostras } from "@/services/amostra.service"

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
    async addAmostra(payload: Partial<Amostra>) {
      try {
        const newAmostra = await createAmostras(payload)
        this.amostras.push(newAmostra)
      } catch (error) {
        console.error("Failed to create amostra:", error)
      }
    },
  },
})