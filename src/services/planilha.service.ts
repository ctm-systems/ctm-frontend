import { api } from "./api"
import type { Planilha } from "@/types/Planilha"

export async function getPlanilhas(): Promise<Planilha[]> {
  const { data } = await api.get<Planilha[]>("/planilhas")
  return data
}

export async function createPlanilha(payload: Partial<Planilha>) {
  const { data } = await api.post<Planilha>("/planilhas", payload)
  return data
}