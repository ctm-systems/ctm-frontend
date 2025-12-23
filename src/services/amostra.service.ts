import { api } from "./api"
import type { Amostra } from "@/types/Amostra"

export async function getAmostras(): Promise<Amostra[]> {
  const { data } = await api.get<Amostra[]>("/amostras")
  return data
}

export async function createAmostras(payload: Partial<Amostra> | FormData) {
  const config = payload instanceof FormData 
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {}
    
  const { data } = await api.post<Amostra>("/amostras", payload, config)
  return data
}

export async function attachProcessos(amostraId: number, processos: number[]): Promise<Amostra> {
  return api.post(`/amostras/${amostraId}/adicionar-processo`, { processos }).then(res => res.data)
}
