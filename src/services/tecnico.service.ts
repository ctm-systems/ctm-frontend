import { api } from "./api"
import type { Tecnico } from "@/types/Tecnico"

export async function getTecnicos(): Promise<Tecnico[]> {
  const { data } = await api.get<Tecnico[]>("/tecnicos")
  return data
}
