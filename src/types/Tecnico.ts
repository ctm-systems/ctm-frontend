import type { Role } from "./Role"

export interface Tecnico {
  id: number
  nome: string
  matricula: string
  roles: Role[]
}
