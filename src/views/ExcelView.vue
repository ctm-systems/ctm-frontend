<script setup lang="ts">
</script>

<template>
  <v-container class="py-10" style="max-width: 1166px">
    <!-- Cliente -->
    <v-row class="mb-2">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Cliente</span>
          <v-select variant="outlined" class="mt-5 rounded-lg" label="Selecione o cliente" />
      </v-col>
    </v-row>

    <!-- Amostra -->
    <v-row class="mb-2">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Amostra</span>
          <v-select variant="outlined" class="mt-5 rounded-lg" label="Selecione a amostra" />
      </v-col>
    </v-row>
    <v-file-upload
      color="#EDEDED"
      icon="mdi-file-edit"
      density="compact"
      title="Arraste ou clique para adicionar arquivo"
    ></v-file-upload>
  </v-container>
</template>
