import type { Client } from "./Client"
import type { Orcamento } from "./Orçamento"
import type { Planilha } from "./Planilha"

export interface Laudo {
  id: number
  clienteId: number | null
  orcamentoId: number | null
  client: Client
  orcamento: Orcamento
  planilhas: Planilha[]
  createdAt: string
  updatedAt: string
}
