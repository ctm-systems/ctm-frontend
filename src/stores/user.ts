import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { getUsers } from '@/services/user.service'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true
      this.error = null
      try {
        this.users = await getUsers()
      } catch (err) {
        this.error = (err as Error).message
      } finally {
        this.isLoading = false
      }
    },
  },
})
