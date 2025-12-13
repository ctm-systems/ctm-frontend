<script setup lang="ts">
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerar Laudo</span>
      </v-col>
      <v-col cols="12">

        <v-form @submit.prevent>
          <v-select
            label="Cliente"
            :items="['Cliente 1', 'Cliente 2', 'Cliente 3']"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Orçamento"
            :items="['Orçamento 1', 'Orçamento 2', 'Orçamento 3']"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Planilha"
            :items="['Planilha 1', 'Planilha 2', 'Planilha 3']"
            variant="outlined"
            density="compact"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A">Limpar campos</v-btn>
            <v-btn color="#00A400">Gerar laudo</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
