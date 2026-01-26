import { defineStore } from "pinia"
import type { Process } from "@/types/Process"
import { getProcesses, createProcess, deleteProcess, updateProcess } from "@/services/process.service"

export const useProcessStore = defineStore("process", {
  state: () => ({
    processes: [] as Process[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProcesses() {
      this.isLoading = true
      this.error = null
      try {
        this.processes = await getProcesses()
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
    async addProcess(process: Partial<Process>) {
      this.isLoading = true
      this.error = null
      try {
        const newProcess = await createProcess(process)
        this.processes.push(newProcess)
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
    async editProcess(id: number, process: Partial<Process>) {
      this.isLoading = true
      this.error = null
      try {
        const updatedProcess = await updateProcess(id, process)
        const index = this.processes.findIndex(p => p.id === id)
        if (index !== -1) {
          this.processes[index] = updatedProcess
        }
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
    async deleteProcessById(id: number) {
      this.isLoading = true
      this.error = null
      try {
        await deleteProcess(id)
        this.processes = this.processes.filter(p => p.id !== id)
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
  },
})
