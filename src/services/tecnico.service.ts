import { api } from "./api"
import type { Tecnico } from "@/types/Tecnico"

export async function getTecnicos(): Promise<Tecnico[]> {
  const { data } = await api.get<Tecnico[]>("/tecnicos")
  return data
}

export async function createTecnico(payload: Partial<Tecnico>) {
  const { data } = await api.post<Tecnico>("/tecnicos", payload)
  return data
}

export async function updateTecnico(tecnicoId: number, payload: Partial<Tecnico>) {
  const { data } = await api.put<Tecnico>(`/tecnicos/${tecnicoId}`, payload)
  return data
}

export async function deleteTecnico(tecnicoId: number): Promise<void> {
  return api.delete(`/tecnicos/${tecnicoId}`).then(res => res.data)
}
