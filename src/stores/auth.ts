import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { getSuapUser } from '@/services/suap.service'
import type { SuapUser } from '@/types/SuapUser'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as SuapUser | null,
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

    async fetchUser() {
      this.loading = true
      try {
        this.user = await getSuapUser()
        this.isAuthenticated = true
      } catch {
        this.user = null
        this.isAuthenticated = false
        throw new Error('Não autenticado')
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await api.get('/logout')
      this.isAuthenticated = false
      this.user = null
    },
  },
})
