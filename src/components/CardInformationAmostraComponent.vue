<script setup lang="ts">
defineProps({
  identificacao: String,
  tipoAmostra: String,
  processos: String,
  foto: String || null,
})
</script>

<template>
  <!-- Seção de Informações da Amostra -->
  <v-card
    class="rounded-lg"
    elevation="2"
  >
    <v-card-text class="pa-5">
      <v-row>
        <!-- Foto da Amostra -->
        <v-col cols="12" md="3" class="d-none d-md-flex">
          <v-img :src="foto" class="bg-red rounded-lg" height="150"/>
        </v-col>

        <!-- Informações da Amostra -->
        <v-col cols="12" md="9">
          <v-row>
            <!-- Identificação da Amostra -->
            <v-col cols="12" md="6">
              <div class="d-flex flex-column ga-2">
                <span class="text-subtitle-1 font-weight-bold">Identificação da amostra</span>
                <span class="text-subtitle-1">{{ identificacao }}</span>
              </div>
            </v-col>

            <!-- Tipo de Amostra -->
            <v-col cols="12" md="6">
              <div class="d-flex flex-column ga-2">
                <span class="text-subtitle-1 font-weight-bold">Tipo de amostra</span>
                <span class="text-subtitle-1">{{ tipoAmostra }}</span>
              </div>
            </v-col>

            <!-- Processos -->
            <v-col cols="12">
              <div class="d-flex flex-column ga-2">
                <span class="text-subtitle-1 font-weight-bold">Processos</span>
                <span class="text-subtitle-1">{{ processos }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>