import { api } from "./api"
import type { Client } from "@/types/Client"

export async function getClients(): Promise<Client[]> {
  const { data } = await api.get<Client[]>("/clientes")
  return data
}

export async function createClients(payload: Partial<Client>) {
  const { data } = await api.post<Client>("/clientes", payload)
  return data
}
