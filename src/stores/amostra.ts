import { defineStore } from "pinia"
import type { Amostra } from "@/types/Amostra"
import { getAmostras } from "@/services/amostra.service"

export const useAmostrasStore = defineStore("amostras", {
  state: () => ({
    amostras: [] as Amostra[],
    loading: false,
  }),

  actions: {
    async fetchAmostras() {
      this.loading = true
      try {
        this.amostras = await getAmostras()
      } finally {
        this.loading = false
      }
    },

    addAmostra(amostra: Amostra) {
      this.amostras.unshift(amostra)
    },
  },
})
