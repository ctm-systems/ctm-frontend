<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import SideBarComponent from './components/SideBarComponent.vue';
import ExcelView from './views/ExcelView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <SideBarComponent />
      <v-main>
        <ExcelView />
      </v-main>
      <!-- <LoginView /> -->
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
