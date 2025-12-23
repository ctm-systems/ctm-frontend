import { defineStore } from 'pinia'
import type { Client } from '@/types/Client'
import { getClients, createClients } from '@/services/client.service'

export const useClientStore = defineStore("client", {
  state: () => ({
    clients: [] as Client[],
  }),
  actions: {
    async fetchClients() {
      try {
        this.clients = await getClients()
      } catch (error) {
        console.error("Failed to fetch clients:", error)
      }
    },
    async addClient(payload: Partial<Client>) {
      try {
        const newClient = await createClients(payload)
        this.clients.push(newClient)
      } catch (error) {
        console.error("Failed to create client:", error)
      }
    },
  },
})