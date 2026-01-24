import { defineStore } from 'pinia'
import type { Client } from '@/types/Client'
import { getClients, getClientById, createClients, attachTecnicos, deleteClient } from '@/services/client.service'

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
    async fetchClientById(clientId: number, carregarTecnicos: boolean = false): Promise<Client | undefined> {
      try {
        const client = await getClientById(clientId, carregarTecnicos)
        return client
      } catch (error) {
        console.error("Failed to fetch client by ID:", error)
        return undefined
      }
    },
    async addClient(payload: Partial<Client>): Promise<Client | undefined> {
      try {
        const newClient = await createClients(payload)
        this.clients.push(newClient)
        return newClient
      } catch (error) {
        console.error("Failed to create client:", error)
        return undefined
      }
    },
    async deleteClientById(clientId: number) {
      try {
        await deleteClient(clientId)
        this.clients = this.clients.filter(client => client.id !== clientId)
      } catch (error) {
        console.error('Failed to delete client:', error)
      }
    },
    async attachTecnicosToClient(clientId: number, tecnicoIds: number[]) {
      try {
        await attachTecnicos(clientId, tecnicoIds)
      } catch (error) {
        console.error('Failed to attach técnicos to client:', error)
      }
    },
  },
})
