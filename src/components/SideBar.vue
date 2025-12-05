<template>
  <v-navigation-drawer
    :width="expanded ? 260 : 75"
    app
    permanent
    @mouseenter="expanded = true"
    @mouseleave="expanded = false"
    class="py-4 d-flex"
  >
    <div class="drawer-content" >

      <!-- TOPO (avatar + nome) -->
      <div class="user m">
        <!-- Perfil do usuário com sidebar expandida -->
        <div class="d-flex flex-row align-center" v-if="expanded">
          <v-avatar size="40" class="ml-4">
            <img src="/assets/avatar-teste.jpeg" alt="user" />
          </v-avatar>
          <div size="40" class="nome-usuario ml-6 mr-6">Nome do usuário</div>
        </div>
        <!-- Perfil do usuário com sidebar reduzida -->
        <div v-else class="d-flex justify-center">
          <v-avatar size="40">
            <img src="/assets/avatar-teste.jpeg" alt="user" />
          </v-avatar>
        </div>
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
          class="rounded-lg ml-2 mr-"
        ></v-list-item>
      </v-list>

      <!-- SAIR -->
      <div class="mt-auto ml-2 mr-2">
        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            :title="expanded ? 'Sair' : ''"
            @click="logout"
            class="logout-item rounded-lg px-2"
          ></v-list-item>
        </v-list>
      </div>
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
  { title: "Cadastrar amostra", icon: "mdi-gold", active: false },
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

<style>
/* Estilo base dos itens */
.menu-item {
  transition: background 0.25s;
}

/* Item ativo */
.menu-active {
  color: #0E544A !important;
}

/* Botão de sair */
.logout-item {
  margin: 4px 8px;
  color: #e53935 !important;
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

.v-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nome-usuario{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
