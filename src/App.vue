<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import SideBarComponent from './components/SideBarComponent.vue';
import ListClientsView from './views/ListClientsView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <SideBarComponent />
      <!-- <LoginView /> -->
      <v-main>
        <ListClientsView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
