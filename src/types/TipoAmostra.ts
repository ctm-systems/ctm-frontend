import type { Amostra } from "./Amostra"

export interface TipoAmostra {
  id: number
  nome: string
  amostras?: Amostra[]
}
