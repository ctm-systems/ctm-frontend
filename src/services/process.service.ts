import { api } from "./api"
import type { Process } from "@/types/Process"

export async function getProcesses(): Promise<Process[]> {
  const { data } = await api.get<Process[]>("/processos")
  return data
}
