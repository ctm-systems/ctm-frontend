<script setup lang="ts">
// import LoginView from './views/LoginView.vue';
import AddSampleView from './views/AddSampleView.vue';
</script>

<template>
  <v-responsive>
    <v-app>
      <SideBarComponent />
      <!-- <LoginView /> -->
      <v-main>
        <AddSampleView />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
