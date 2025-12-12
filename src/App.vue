<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import SideBarComponent from './components/SideBarComponent.vue';
// import ListClientsView from './views/ClientesView/ListClientsView.vue';
// import InformationClientsView from './views/ClientesView/InformationClientsView.vue';
import InformationAmostrasView from './views/ClientesView/InformationAmostrasView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <SideBarComponent />
      <!-- <LoginView /> -->
      <v-main>
        <!-- <ListClientsView /> -->
        <InformationAmostrasView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
