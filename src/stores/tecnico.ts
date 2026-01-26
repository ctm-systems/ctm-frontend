import { defineStore } from "pinia"
import type { Tecnico } from "@/types/Tecnico"
import { getTecnicos, createTecnico, updateTecnico, deleteTecnico } from "@/services/tecnico.service"

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
    async addTecnico(payload: Partial<Tecnico>) {
      this.isLoading = true
      this.error = null
      try {
        const newTecnico = await createTecnico(payload)
        this.tecnicos.push(newTecnico)
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
    async updateTecnico(tecnicoId: number, payload: Partial<Tecnico>) {
      this.isLoading = true
      this.error = null
      try {
        const updatedTecnico = await updateTecnico(tecnicoId, payload)
        const index = this.tecnicos.findIndex(t => t.id === tecnicoId)
        if (index !== -1) {
          this.tecnicos[index] = updatedTecnico
        }
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
    async deleteTecnicoById(tecnicoId: number) {
      this.isLoading = true
      this.error = null
      try {
        await deleteTecnico(tecnicoId)
        this.tecnicos = this.tecnicos.filter(t => t.id !== tecnicoId)
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
  },
})
