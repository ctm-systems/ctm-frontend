import type { Role } from "./Role"

export interface SuapUser {
  identificacao: string
  nome_usual: string
  foto: string
  roles: Role[]
}
