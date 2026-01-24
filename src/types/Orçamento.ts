import type { Client } from "./Client"
import type { Amostra } from "./Amostra"

export enum StatusOrcamento {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  RECUSADO = 'RECUSADO',
}

export interface Orcamento {
  id: number
  identificacao: string
  status: StatusOrcamento
  clienteId: number | null
  cliente: Client
  amostras: Amostra[]
  createdAt: string
  updatedAt: string
}
