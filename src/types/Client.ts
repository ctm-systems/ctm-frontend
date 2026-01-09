import type { Tecnico } from './Tecnico'

export interface Client {
  id: number
  nome: string
  email: string
  cep: string
  telefone: string
  cpf?: string
  cnpj?: string
  endereco: string
  createdAt: string
  updatedAt: string
  tecnicos?: Tecnico[]
}
