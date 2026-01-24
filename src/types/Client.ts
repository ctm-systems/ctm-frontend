import type { Tecnico } from './Tecnico'
import type { Amostra } from './Amostra'
import type { Laudo } from './Laudo'
import type { Planilha } from './Planilha'
import type { Orcamento } from './Orçamento'

export interface Client {
  id: number
  nome: string
  email: string
  cep: string
  telefone: string
  cpf?: string
  cnpj?: string
  endereco: string
  amostras?: Amostra[]
  laudos?: Laudo[]
  planilhas?: Planilha[]
  tecnicos?: Tecnico[]
  orcamentos?: Orcamento[]
  createdAt: string
  updatedAt: string
}
