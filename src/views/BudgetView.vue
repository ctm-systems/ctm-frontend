<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerar Orçamento</span>
      </v-col>
      <v-col cols="12">

        <v-form @submit.prevent>
            <TextInputComponent
                placeholder-props="Identificação do orçamento"
                density="compact"
              />

          <v-select
            label="Cliente"
            :items="['Cliente 1', 'Cliente 2', 'Cliente 3']"
            variant="outlined"
            density="compact"
          />

            <v-select
            label="Amostra"
            variant="outlined"
            density="compact"
            :items="['Amostra 1', 'Amostra 2', 'Amostra 3']"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A">Limpar campos</v-btn>
            <v-btn color="#00A400">Gerar Orçamento</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
