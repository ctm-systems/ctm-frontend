<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
</script>

<template>
  <v-container class="py-10" style="max-width: 1166px">
    <!-- Cliente -->
    <v-row class="mb-6">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Cliente</span>
        <v-sheet class="rounded-lg">
          <TextInputComponent placeholderProps="Selecione o cliente" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Orçamento -->
    <v-row class="mb-6">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Orçamento</span>
        <v-sheet class="rounded-lg">
          <TextInputComponent placeholderProps="Selecione o orçamento" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Planilhas -->
    <v-row class="mb-10">
      <v-col cols="12">
        <span class="text-h5 font-weight-bold">Planilhas</span>
        <v-sheet class="rounded-lg">
          <TextInputComponent placeholderProps="Selecione a planilha" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Botões -->
    <v-row justify="end" class="mt-10">
      <v-col cols="auto">
        <v-btn color="#FF1A1A"> Limpar campos </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#00A400"> Gerar laudo </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
