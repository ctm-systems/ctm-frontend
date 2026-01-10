import type { Client } from "./Client"
import type { Amostra } from "./Amostra"

export interface Planilha {
  id: number
  identificacao: string
  arquivo: string
  laudoId: number | null
  amostraId: number | null
  clienteId: number | null
  cliente: Client
  amostra: Amostra
  createdAt: string
  updatedAt: string
}
