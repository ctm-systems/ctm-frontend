import { defineStore } from "pinia"
import type { TipoAmostra } from "@/types/TipoAmostra"
import { getTipoAmostras } from "@/services/tipoAmostra.service"

export const useTipoAmostraStore = defineStore("tipoAmostras", {
  state: () => ({
    tipoAmostras: [] as TipoAmostra[],
    loading: false,
  }),

  actions: {
    async fetchTipoAmostras() {
      this.loading = true
      try {
        this.tipoAmostras = await getTipoAmostras()
      } finally {
        this.loading = false
      }
    },

    addTipoAmostra(tipoAmostra: TipoAmostra) {
      this.tipoAmostras.unshift(tipoAmostra)
    },
  },
})
