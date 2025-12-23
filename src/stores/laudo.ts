import { defineStore } from "pinia"
import type { Laudo } from "@/types/Laudo"
import { getLaudos, createLaudo } from "@/services/laudo.service"

export const useLaudoStore = defineStore("laudo", {
  state: () => ({
    laudos: [] as Laudo[],
  }),
  actions: {
    async fetchLaudos() {
      try {
        this.laudos = await getLaudos()
      } catch (error) {
        console.error("Failed to fetch laudos:", error)
      }
    },
    async addLaudo(payload: Partial<Laudo>) {
      try {
        const newLaudo = await createLaudo(payload)
        this.laudos.push(newLaudo)
      } catch (error) {
        console.error("Failed to create laudo:", error)
      }
    },
  },
})