import { api } from "./api"
import type { Orcamento } from "@/types/Orçamento"

export async function getOrcamentos(): Promise<Orcamento[]> {
  const { data } = await api.get<Orcamento[]>("/orcamentos")
  return data
}

export async function createOrcamento(payload: Partial<Orcamento>) {
  const { data } = await api.post<Orcamento>("/orcamentos", payload)
  return data
}

export async function attachAmostra(orcamentoId: number, amostras: number[]): Promise<Orcamento> {
  return await api.post(`/orcamentos/${orcamentoId}/adicionar-amostra`, { amostras }).then(res => res.data)
}

export async function updateOrcamentoStatus(orcamentoId: number, status: string): Promise<Orcamento> {
  const { data } = await api.put<Orcamento>(`/orcamentos/${orcamentoId}`, { status })
  return data
}
