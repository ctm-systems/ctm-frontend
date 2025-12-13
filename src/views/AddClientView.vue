<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Adicionar cliente</span>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent>
          <v-row dense>
            <v-col cols="12" md="6">
              <TextInputComponent
                v-model="form.nome"
                placeholder-props="Nome do cliente"
                prepend-icon-props="mdi-account"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="6">
              <TextInputComponent
                v-model="form.email"
                placeholder-props="Email"
                type-props="email"
                prepend-icon-props="mdi-email"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="6">
              <TextInputComponent
                v-model="form.cpf"
                placeholder-props="CPF/CNPJ"
                prepend-icon-props="mdi-card-account-details"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="6">
              <TextInputComponent
                v-model="form.telefone"
                placeholder-props="Telefone"
                prepend-icon-props="mdi-phone"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="4">
              <TextInputComponent
                v-model="form.cep"
                placeholder-props="CEP"
                prepend-icon-props="mdi-map-marker"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="8">
              <TextInputComponent
                v-model="form.endereco"
                label="Endereço"
                placeholder-props="Endereço"
                prepend-icon-props="mdi-home"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="8">
              <v-select
                v-model="form.tecnicos"
                :items="tecnicosLista"
                label="Técnico(s) responsável(is)"
                multiple
                chips
                variant="outlined"
                class="rounded-lg"
                density="compact"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.data"
                type="date"
                label="Data de recebimento"
                variant="outlined"
                class="rounded-lg"
                density="compact"
              />
            </v-col>
          </v-row>

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A">Limpar campos</v-btn>
            <v-btn color="#00A400">Adicionar</v-btn>
          </div>
        </v-form>
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
