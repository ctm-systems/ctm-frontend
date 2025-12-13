<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Cadastrar amostra</span>
      </v-col>
      <v-col cols="12">
        <v-form>
          <v-file-input
            label="Foto da amostra"
            prepend-icon="mdi-camera"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Cliente"
            :items="['Cliente 1', 'Cliente 2', 'Cliente 3']"
            variant="outlined"
            density="compact"
          />

          <TextInputComponent
            label="Identificação da amostra"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Tipo de amostra"
            :items="['Rocha', 'Areia']"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Processos"
            :items="['FRX', 'DRX', 'Moagem']"
            variant="outlined"
            density="compact"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A">Limpar campos</v-btn>
            <v-btn color="#00A400">Adicionar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
