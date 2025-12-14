import { api } from "./api"
import type { TipoAmostra } from "@/types/TipoAmostra"

export async function getTipoAmostras(): Promise<TipoAmostra[]> {
  const { data } = await api.get<TipoAmostra[]>("/tipos-amostras")
  return data
}
