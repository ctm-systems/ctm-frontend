export interface Amostra {
  id: number
  nome: string
  foto: string | null
  clienteId: number | null
  tipoAmostraId: number | null
  orcamentoId: number | null
  dataRecebimento: string
  createdAt: string
  updatedAt: string
}
