import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: '',
  }),

  actions: {
    async login(username: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        await api.post('/login', { username, password })

        this.isAuthenticated = true
      } catch (err) {
        this.error = 'Credenciais inválidas'
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await api.post('/logout')
      this.isAuthenticated = false
      this.user = null
    },
  },
})
