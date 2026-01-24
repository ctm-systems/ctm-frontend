import { defineStore } from "pinia"
import type { Tecnico } from "@/types/Tecnico"
import { getTecnicos } from "@/services/tecnico.service"

export const useTecnicoStore = defineStore("tecnico", {
  state: () => ({
    tecnicos: [] as Tecnico[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTecnicos() {
      this.isLoading = true
      this.error = null
      try {
        this.tecnicos = await getTecnicos()
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
  },
})
