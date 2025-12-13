<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import SideBarComponent from './components/SideBarComponent.vue';
import GerarLaudoView from './views/GerarLaudoView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <!-- <LoginView /> -->
      <SideBarComponent />
      <v-main>
        <GerarLaudoView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
