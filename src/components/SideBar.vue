<template>
  <v-navigation-drawer
    :width="expanded ? 260 : 75"
    app
    permanent
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    class="py-4 d-flex"
  >
    <div class="d-flex flex-column h-100">

      <!-- TOPO (avatar + nome) -->
      <div class="d-flex align-center ga-5 px-4">
        <v-avatar>
          <img src="@/../assets/avatar-teste.jpeg" alt="user" />
        </v-avatar>
        <div v-if="expanded" class="text-body-2 text-truncate" style="max-width: 200px;">Nome do usuário</div>
      </div>

      <!-- MENU PRINCIPAL -->
      <v-list nav density="comfortable">
        <v-list-item
          v-for="item in menu"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="expanded ? item.title : ''"
          @click="setActive(item)"
          :class="{
            'text-primary': item.active,
            'text-medium-emphasis': !item.active
          }"
          class="rounded-lg mx-2 transition-all"
        ></v-list-item>
      </v-list>

      <!-- SAIR -->
      <div class="mt-auto ml-2 mr-2">
        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            :title="expanded ? 'Sair' : ''"
            @click="logout"
            class="rounded-lg mx-2 text-error hover:bg-error-lighten-4 transition-all"
          ></v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)

const menu = ref([
  { title: 'Dashboard', icon: 'mdi-home', active: true },
  { title: 'Lista de clientes', icon: 'mdi-view-list', active: false },
  { title: 'Cadastrar cliente', icon: 'mdi-account-plus', active: false },
  { title: 'Cadastrar amostra', icon: 'mdi-gold', active: false },
  { title: 'Gerar orçamento', icon: 'mdi-file-pdf-box', active: false },
  { title: 'Tratar excel', icon: 'mdi-table', active: false },
  { title: 'Gerar laudo', icon: 'mdi-file-document-edit', active: false },
])

function setActive(item: { active: boolean }) {
  menu.value.forEach((i) => (i.active = false))
  item.active = true
}

/* Função do botão sair */
function logout() {
  console.log('Saindo...')
  // Aqui você pode:
  // - limpar token
  // - redirecionar
  // - chamar API de logout
}
</script>

<style scoped>
/* Transição suave do drawer */
.v-navigation-drawer {
  transition: width 0.25s ease;
}

/* Garantir que a imagem do avatar cubra todo o espaço */
.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Classes de transição personalizadas */
.transition-all {
  transition: all 0.25s ease;
}
</style>
