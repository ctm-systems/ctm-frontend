export interface Planilha {
  id: number
  identificacao: string
  arquivo: string
  laudoId: number | null
  amostraId: number | null
  clienteId: number | null
  createdAt: string
  updatedAt: string
}
