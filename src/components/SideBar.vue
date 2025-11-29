<template>
  <v-navigation-drawer
    :width="expanded ? 260 : 80"
    app
    permanent
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    class="py-4"
  >
    <!-- TOPO (avatar + nome) -->
    <div class="d-flex flex-column align-center mb-6" v-if="expanded">
      <v-avatar size="56" class="mb-2">
        <img src="" alt="user" />
      </v-avatar>
      <div class="text-subtitle-1 font-weight-medium">Nome do usuário</div>
    </div>

    <div v-else class="d-flex justify-center mb-10">
      <v-avatar size="40">
        <img src="" alt="user" />
      </v-avatar>
    </div>

    <!-- MENU PRINCIPAL -->
    <v-list nav density="comfortable">
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="expanded ? item.title : ''"
        @click="setActive(item)"
        :class="[
          'menu-item',
          item.active ? 'menu-active' : ''
        ]"
      ></v-list-item>
    </v-list>

    <!-- SAIR -->
    <div class="mt-auto">
      <v-list>
        <v-list-item
          prepend-icon="mdi-logout"
          :title="expanded ? 'Sair' : ''"
          @click="logout"
          class="logout-item"
        ></v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const expanded = ref(false);

const menu = ref([
  { title: "Dashboard", icon: "mdi-home", active: true },
  { title: "Lista de clientes", icon: "mdi-view-list", active: false },
  { title: "Cadastrar cliente", icon: "mdi-account-plus", active: false },
  { title: "Cadastrar amostra", icon: "mdi-flask", active: false },
  { title: "Gerar orçamento", icon: "mdi-file-pdf-box", active: false },
  { title: "Tratar excel", icon: "mdi-table", active: false },
  { title: "Gerar laudo", icon: "mdi-file-document-edit", active: false },
]);

function setActive(item) {
  menu.value.forEach((i) => (i.active = false));
  item.active = true;
}

/* Função do botão sair */
function logout() {
  console.log("Saindo...");
  // Aqui você pode:
  // - limpar token
  // - redirecionar
  // - chamar API de logout
}
</script>

<style scoped>
/* Estilo base dos itens */
.menu-item {
  border-radius: 10px;
  margin: 4px 8px;
  transition: background 0.25s;
}

/* Item ativo */
.menu-active {
  background: #e3e3e3 !important;
  font-weight: 600;
}

/* Botão de sair */
.logout-item {
  border-radius: 10px;
  margin: 4px 8px;
  color: #e53935 !important;
  font-weight: 600;
  transition: background 0.25s;
}

/* Hover do Sair */
.logout-item:hover {
  background: #ffe5e5 !important;
}

/* Transição do drawer */
.v-navigation-drawer {
  transition: width 0.25s ease;
}
</style>
