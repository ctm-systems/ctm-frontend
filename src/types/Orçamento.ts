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
  createdAt: string
  updatedAt: string
}
