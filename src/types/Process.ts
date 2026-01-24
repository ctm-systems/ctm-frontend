import type { Amostra } from "./Amostra"

export interface Process {
  id: number
  nome: string
  preco: string
  amostras: Amostra[]
  createdAt: string
  updatedAt: string
}
