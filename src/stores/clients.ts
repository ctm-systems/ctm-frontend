import { defineStore } from 'pinia'
import type { Client } from '@/types/Client'
import { getClients } from '@/services/client.service'

export const useClientsStore = defineStore('clientes', {
  state: () => ({
    clients: [] as Client[],
    loading: false,
  }),

  actions: {
    async fetchClients() {
      this.loading = true
      try {
        this.clients = await getClients()
      } finally {
        this.loading = false
      }
    },

    addClient(client: Client) {
      this.clients.unshift(client)
    },
  },
})
