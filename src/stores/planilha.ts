import { defineStore } from "pinia"
import type { Planilha } from "@/types/Planilha"
import { getPlanilhas, createPlanilha, downloadPlanilha } from "@/services/planilha.service"

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
    async downloadPlanilha(id: number, filename: string = 'planilha.xlsx'): Promise<void> {
      try {
        console.log(`Fazendo requisição para download da planilha ID: ${id}`)
        const blob = await downloadPlanilha(id)
        console.log('Blob recebido:', { size: blob.size, type: blob.type })

        const url = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Failed to download planilha:", error)
        throw error
      }
    },
  },
})
