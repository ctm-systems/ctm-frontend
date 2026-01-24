import { defineStore } from "pinia"
import type { Process } from "@/types/Process"
import { getProcesses } from "@/services/process.service"

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
  },
})
