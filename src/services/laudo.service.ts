import { api } from "./api"
import type { Laudo } from "@/types/Laudo"

export async function getLaudos(): Promise<Laudo[]> {
  const { data } = await api.get<Laudo[]>("/laudos")
  return data
}

export async function createLaudo(payload: Partial<Laudo>) {
  const { data } = await api.post<Laudo>("/laudos", payload)
  return data
}

export async function attachPlanilhas(laudoId: number, planilhas: number[]): Promise<Laudo> {
  return api.post(`/laudos/${laudoId}/adicionar-planilha`, { planilhas }).then(res => res.data)
}
