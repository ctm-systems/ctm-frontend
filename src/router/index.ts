import { createRouter, createWebHistory } from 'vue-router'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
      ],
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../views/CallbackView.vue'),
    },
    {
      path: '/app',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/app/clientes',
          name: 'clientes',
          component: () => import('../views/ClientesView/ListClientsView.vue'),
        },
        {
          path: '/app/clientes/informacoes/:id',
          name: 'informacoes-cliente',
          component: () => import('../views/ClientesView/InformationClientsView.vue'),
        },
        {
          path: '/app/clientes/informacoes/:id/detalhes/:amostraId',
          name: 'detalhes-amostra',
          component: () => import('../views/ClientesView/InformationAmostrasView.vue'),
        },
        {
          path: '/app/clientes/cadastrar',
          name: 'cadastrar-cliente',
          component: () => import('../views/AddClientView.vue'),
        },
        {
          path: '/app/amostras/cadastrar',
          name: 'cadastrar-amostra',
          component: () => import('../views/AddSampleView.vue'),
        },

        {
          path: '/app/orcamentos/gerar',
          name: 'gerar-orcamento',
          component: () => import('../views/BudgetView.vue'),
        },

        {
          path: '/app/excel/tratar',
          name: 'tratar-excel',
          component: () => import('../views/ExcelView.vue'),
        },
        {
          path: '/app/admin/usuarios',
          name: 'gerencia-usuarios',
          component: () => import('../views/ManageUsersView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: '/app/admin/processos',
          name: 'gerencia-processos',
          component: () => import('../views/ManageProcessView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        }
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!to.meta.requiresAuth) {
    return next()
  }

  if (!authStore.isAuthenticated || !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch (error) {
      return next('/login')
    }
  }

  if (to.meta.requiresAdmin && !authStore.isDiretor) {
    alert('Acesso negado: Usuário não possui privilégios de diretor.')
    return next('/app/clientes')
  }

  next()
})

export default router
