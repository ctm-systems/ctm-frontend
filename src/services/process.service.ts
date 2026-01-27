import { api } from "./api"
import type { Process } from "@/types/Process"

export async function getProcesses(): Promise<Process[]> {
  const { data } = await api.get<Process[]>("/processos")
  return data
}

export async function createProcess(process: Partial<Process>): Promise<Process> {
  const { data } = await api.post<Process>("/processos", process)
  return data
}

export async function updateProcess(id: number, process: Partial<Process>): Promise<Process> {
  const { data } = await api.put<Process>(`/processos/${id}`, process)
  return data
}

export async function deleteProcess(id: number): Promise<void> {
  await api.delete(`/processos/${id}`)
}
