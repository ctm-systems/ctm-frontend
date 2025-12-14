import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        },
      ]
    },
    {
      path: '/app',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        // Adicionar a rota para a dashboard

        {
          path: '/app/clientes',
          name: 'clientes',
          component: () => import('../views/ClientesView/ListClientsView.vue')
        },
        {
          path: '/app/clientes/cadastrar',
          name: 'cadastrar-cliente',
          component: () => import('../views/AddClientView.vue')
        },
        {
          path: '/app/amostras/cadastrar',
          name: 'cadastrar-amostra',
          component: () => import('../views/AddSampleView.vue')
        },

        {
          path: '/app/orcamentos/gerar',
          name: 'gerar-orcamento',
          component: () => import('../views/BudgetView.vue')
        },

        {
          path: '/app/excel/tratar',
          name: 'tratar-excel',
          component: () => import('../views/ExcelView.vue')
        },
        {
          path: '/app/laudos/gerar',
          name: 'gerar-laudo',
          component: () => import('../views/GerarLaudoView.vue')
        }
      ]
    },
  ],
})

export default router
