import { defineStore } from "pinia"
import type { Process } from "@/types/Process"
import { getProcesses } from "@/services/process.service"

export const useProcessStore = defineStore("processos", {
  state: () => ({
    processes: [] as Process[],
    loading: false,
  }),

  actions: {
    async fetchProcesses() {
      this.loading = true
      try {
        this.processes = await getProcesses()
      } finally {
        this.loading = false
      }
    },

    addProcess(process: Process) {
      this.processes.unshift(process)
    },
  },
})
