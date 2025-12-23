import { defineStore } from "pinia"
import type { TipoAmostra } from "@/types/TipoAmostra"
import { getTipoAmostras } from "@/services/tipoAmostra.service"

export const useTipoAmostraStore = defineStore("tipoAmostra", {
  state: () => ({
    tipoAmostras: [] as TipoAmostra[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTipoAmostras() {
      this.isLoading = true
      this.error = null
      try {
        this.tipoAmostras = await getTipoAmostras()
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
  },
})
