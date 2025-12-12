<template>
  <v-container class="py-10" style="max-width: 1166px">
    <v-row dense>
      <!-- Nome -->
      <v-col cols="12" md="6">
        <TextInputComponent
          v-model="form.nome"
          placeholder-props="Nome do cliente"
          prepend-icon-props="mdi-account"
        />
      </v-col>

      <!-- Email -->
      <v-col cols="12" md="6">
        <TextInputComponent
          v-model="form.email"
          placeholder-props="Email"
          type-props="email"
          prepend-icon-props="mdi-email"
        />
      </v-col>

      <!-- CPF/CNPJ -->
      <v-col cols="12" md="6">
        <TextInputComponent
          v-model="form.cpf"
          placeholder-props="CPF/CNPJ"
          prepend-icon-props="mdi-card-account-details"
        />
      </v-col>

      <!-- Telefone -->
      <v-col cols="12" md="6">
        <TextInputComponent
          v-model="form.telefone"
          placeholder-props="Telefone"
          prepend-icon-props="mdi-phone"
        />
      </v-col>

      <!-- CEP -->
      <v-col cols="12" md="4">
        <TextInputComponent
          v-model="form.cep"
          placeholder-props="CEP"
          prepend-icon-props="mdi-map-marker"
        />
      </v-col>

      <!-- Endereço -->
      <v-col cols="12" md="8">
        <TextInputComponent
          v-model="form.endereco"
          label="Endereço"
          placeholder-props="Endereço"
          prepend-icon-props="mdi-home"
        />
      </v-col>

      <!-- Técnicos -->
      <v-col cols="12" md="8">
        <v-select
          v-model="form.tecnicos"
          :items="tecnicosLista"
          label="Técnico(s) responsável(is)"
          multiple
          chips
          variant="outlined"
          class="mt-5 rounded-lg"
        />
      </v-col>

      <!-- Data -->
      <v-col cols="12" md="4">
        <v-text-field
          v-model="form.data"
          type="date"
          label="Data de recebimento"
          variant="outlined"
          class="mt-5 rounded-lg"
        />
      </v-col>
    </v-row>

    <!-- Botões -->
    <v-row justify="end" class="mt-10">
      <v-col cols="auto">
        <v-btn color="#FF1A1A"> Limpar campos </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="#00A400"> Adicionar </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInputComponent from '@/components/TextInputComponent.vue'

// Dados do formulário
const form = ref({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  cep: '',
  endereco: '',
  tecnicos: [],
  data: '',
})

// Lista de técnicos (exemplo)
const tecnicosLista = ['Roberio', 'Ian', 'Jardson', 'Lucas']

</script>
