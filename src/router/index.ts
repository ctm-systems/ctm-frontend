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
        },
        {
          path: '/app/admin/processos',
          name: 'gerencia-processos',
          component: () => import('../views/ManageProcessView.vue'),
        }
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Se a rota não exige autenticação (como login ou callback), deixa passar
  if (!to.meta.requiresAuth) {
    return next()
  }

  // Se já temos o usuário na Store, não precisamos bater no servidor de novo
  if (authStore.isAuthenticated && authStore.user) {
    return next()
  }

  // Tenta validar a sessão (fetchUser chamará o /data internamente)
  try {
    await authStore.fetchUser()
    return next()
  } catch (error) {
    // Se falhar (cookie expirado ou inexistente), vai para o login
    return next('/login')
  }
})

export default router
