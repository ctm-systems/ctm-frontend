<script setup lang="ts">
  import SideBarComponent from '@/components/SideBarComponent.vue';
</script>

<template>
  <v-app>
    <SideBarComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
