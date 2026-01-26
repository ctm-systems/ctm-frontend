import { api } from './api'
import type { User } from '@/types/User'

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users')
  return data
}
