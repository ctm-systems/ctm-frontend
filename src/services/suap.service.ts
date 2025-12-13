import { api } from "./api"
import type { SuapUser } from "@/types/SuapUser"

export async function getSuapUser(): Promise<SuapUser> {
  const { data } = await api.get<SuapUser>("/data")
  return data
}
