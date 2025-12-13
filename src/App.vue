<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import SideBarComponent from './components/SideBarComponent.vue';
import AddClientView from './views/AddClientView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <SideBarComponent />
      <!-- <LoginView /> -->
      <v-main>
        <AddClientView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
