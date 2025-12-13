<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { api } from '@/services/api';

const router = useRouter()

const menu = ref([
  { title: 'Dashboard', icon: 'mdi-home', value: 'dashboard', route: '/app' },
  { title: 'Lista de clientes', icon: 'mdi-view-list', value: 'lista-clientes', route: '/app/clientes' },
  { title: 'Cadastrar cliente', icon: 'mdi-account-plus', value: 'cadastrar-cliente', route: '/app/clientes/cadastrar' },
  { title: 'Cadastrar amostra', icon: 'mdi-gold', value: 'cadastrar-amostra', route: '/app/amostras/cadastrar' },
  { title: 'Gerar orçamento', icon: 'mdi-file-pdf-box', value: 'gerar-orcamento', route: '/app/orcamentos/gerar' },
  { title: 'Tratar excel', icon: 'mdi-table', value: 'tratar-excel', route: '/app/excel/tratar' },
  { title: 'Gerar laudo', icon: 'mdi-file-document-edit', value: 'gerar-laudo', route: '/app/laudos/gerar' },
])

async function logout() {
  try {
    await api.get('/logout')
    router.push('/')
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
  }
}
</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Nome do usuário"
        subtitle="Matrícula"
      />
    </v-list>

    <v-divider />

    <v-list
      density="compact"
      nav
    >
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        :to="item.route"
        router
        class="rounded-lg"
      />
    </v-list>

    <template v-slot:append>
      <v-list
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sair"
          @click="logout"
          class="rounded-lg text-error hover:bg-error-lighten-4"
        />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped></style>
