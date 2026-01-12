<script setup lang="ts">
  defineProps({
    nome: String,
    email: String,
    telefone: String,
    cpfCnpj: String,
    cep: String,
    endereco: String,
    dataCadastro: String,
  })
</script>

<template>
  <!-- Informações do Cliente -->
  <v-card class="mb-6" elevation="2">
    <v-card-text class="pa-5">
      <v-row>
        <!-- Coluna esquerda -->
        <v-col cols="12" md="3" class="d-flex flex-column ga-3">
          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">Nome do cliente</span>
            <span class="text-body-1">{{ nome }}</span>
          </div>

          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">Email</span>
            <span class="text-body-1">{{ email }}</span>
          </div>

          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">Telefone</span>
            <span class="text-body-1">{{ telefone }}</span>
          </div>

          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">CPF/CNPJ</span>
            <span class="text-body-1">{{ cpfCnpj }}</span>
          </div>
        </v-col>

        <!-- Coluna central -->
        <v-col cols="12" md="3" class="d-flex flex-column ga-3">
          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">CEP</span>
            <span class="text-body-1">{{ cep }}</span>
          </div>

          <div class="d-flex flex-column ga-3">
            <span class="text-subtitle-1 font-weight-bold">Endereço</span>
            <span class="text-body-1">{{ endereco }}</span>
          </div>
        </v-col>

        <!-- Coluna direita -->
        <v-col cols="12" md="6" class="d-flex flex-column ga-3">
          <div class="d-flex flex-column ga-3 text-md-right">
            <span class="text-subtitle-1 font-weight-bold">Data de cadastro</span>
            <span class="text-body-1">{{ dataCadastro }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
