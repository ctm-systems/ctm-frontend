import { defineStore } from "pinia"
import type { Tecnico } from "@/types/Tecnico"
import { getTecnicos } from "@/services/tecnico.service"

export const useTecnicoStore = defineStore("tecnicos", {
  state: () => ({
    tecnicos: [] as Tecnico[],
    loading: false,
  }),

  actions: {
    async fetchTecnicos() {
      this.loading = true
      try {
        this.tecnicos = await getTecnicos()
      } finally {
        this.loading = false
      }
    },

    addTecnico(tecnico: Tecnico) {
      this.tecnicos.unshift(tecnico)
    },
  },
})
