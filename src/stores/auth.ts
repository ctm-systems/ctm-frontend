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

  getters: {
    isDiretor: (state) => {
      return state.user?.roles?.some(r => r.nome.toLowerCase() === 'diretor') || false
    }
  },

  actions: {
    async login() {
      this.loading = true
      try {
        const { data } = await api.get<{ url: string }>('/auth/url')
        window.location.href = data.url
      } catch (err) {
        this.error = 'Não foi possível conectar ao servidor de autenticação.'
        this.loading = false
      }
    },

    async handleCallback(code: string) {
      this.loading = true
      try {
        console.log('Chamando backend:', api.defaults.baseURL + '/auth/callback')
        await api.post('/auth/callback', { code })
        await this.fetchUser()
      } catch (err) {
        this.error = 'Falha ao validar acesso com o SUAP.'
        this.isAuthenticated = false
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        const userData = await getSuapUser()
        this.user = userData
        this.isAuthenticated = true
      } catch (err) {
        this.user = null
        this.isAuthenticated = false
        throw err
      }
    },

    async logout() {
      try {
        await api.get('/logout')
      } finally {
        this.user = null
        this.isAuthenticated = false
        window.location.href = '/'
      }
    },
  },
})
