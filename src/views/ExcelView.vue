<script setup lang="ts">
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Tratamento de excel</span>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent>
          <v-select
            label="Cliente"
            variant="outlined"
            density="compact"
            :items="['Cliente 1', 'Cliente 2', 'Cliente 3']"
          />

          <v-select
            label="Amostra"
            variant="outlined"
            density="compact"
            :items="['Amostra 1', 'Amostra 2', 'Amostra 3']"
          />

          <v-file-upload
            color="#EDEDED"
            icon="mdi-file-edit"
            density="compact"
            title="Arraste ou clique para adicionar arquivo"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end mt-4">
            <v-btn color="#FF1A1A">Limpar campos</v-btn>
            <v-btn color="#00A400">Gerar arquivo</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
