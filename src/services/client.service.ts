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

export async function attachTecnicos(clientId: number, tecnicos: number[]): Promise<Client> {
  return api.post(`/clientes/${clientId}/adicionar-tecnico`, { tecnicos }).then(res => res.data)
}
