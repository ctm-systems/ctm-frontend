<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  msg: string
  nome?: string
  email?: string
  telefone?: string
  cpf?: string
  cnpj?: string
  cep?: string
  endereco?: string
  dataCadastro?: string
}

const props = withDefaults(defineProps<Props>(), {
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  cnpj: '',
  cep: '',
  endereco: '',
  dataCadastro: '',
})

const isError = computed(() => props.msg?.toLowerCase() === 'error')

const emptyFields = computed(() => {
  const fields = []
  if (!props.nome) fields.push('Nome')
  if (!props.email) fields.push('Email')
  if (!props.telefone) fields.push('Telefone')
  if (!props.cpf && !props.cnpj) fields.push('CPF ou CNPJ')
  if (!props.cep) fields.push('CEP')
  if (!props.endereco) fields.push('Endereço')
  return fields
})

const cardColor = computed(() => (isError.value ? '#FFE5E5' : '#E5F5E5'))
const titleColor = computed(() => (isError.value ? '#FF1A1A' : '#00A400'))
</script>

<template>
  <v-card :style="{ backgroundColor: cardColor }" class="rounded-lg">
    <v-card-title :style="{ color: titleColor }" class="text-h6 font-weight-bold">
      {{ msg }}
    </v-card-title>
    <v-card-text>
      <div v-if="isError" class="d-flex flex-column ga-2">
        <p v-if="emptyFields.length > 0" class="mb-2">
          <strong>Campos obrigatórios não preenchidos:</strong>
        </p>
        <ul v-if="emptyFields.length > 0" class="pl-4">
          <li v-for="field in emptyFields" :key="field">
            {{ field }}
          </li>
        </ul>
        <p v-else class="text-subtitle-2">
          Ocorreu um erro ao salvar o cliente. Por favor, tente novamente.
        </p>
      </div>
      <div v-else class="d-flex flex-column ga-2">
        <p class="text-subtitle-2">Cliente adicionado com sucesso!</p>
        <div v-if="nome" class="text-caption"><strong>Nome:</strong> {{ nome }}</div>
        <div v-if="email" class="text-caption"><strong>Email:</strong> {{ email }}</div>
        <div v-if="cpf || cnpj" class="text-caption">
          <strong>{{ cpf ? 'CPF' : 'CNPJ' }}:</strong> {{ cpf || cnpj }}
        </div>
        <div v-if="telefone" class="text-caption"><strong>Telefone:</strong> {{ telefone }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
