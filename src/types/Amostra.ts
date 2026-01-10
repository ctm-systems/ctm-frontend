import type { Client } from "./Client"
import type { TipoAmostra } from "./TipoAmostra"
import type { Process } from "./Process"
import type { Orcamento } from "./Orçamento"
import type { Planilha } from "./Planilha"

export interface Amostra {
  id: number
  nome: string
  foto: string | null
  clienteId: number | null
  tipoAmostraId: number | null
  dataRecebimento: string
  cliente: Client
  tipoAmostra: TipoAmostra
  processos: Process[]
  orcamentos: Orcamento[]
  planilhas: Planilha[]
  createdAt: string
  updatedAt: string
}
