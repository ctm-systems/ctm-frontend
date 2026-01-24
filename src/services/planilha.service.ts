import { api } from "./api"
import type { Planilha } from "@/types/Planilha"

export async function getPlanilhas(): Promise<Planilha[]> {
  const { data } = await api.get<Planilha[]>("/planilhas")
  return data
}

export async function createPlanilha(payload: Partial<Planilha> | FormData) {
  const config = payload instanceof FormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {}

  const { data } = await api.post<Planilha>("/planilhas", payload, config)
  return data
}

export async function downloadPlanilha(id: number): Promise<Blob> {
  const url = `/planilhas/${id}/download`

  const { data } = await api.get(url, {
    responseType: 'blob'
  })
  return data
}
