<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Adicionar cliente</span>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent="saveClient">
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

            <v-col cols="12">
              <v-select
                :items="tecnicoStore.tecnicos"
                item-title="nome"
                item-value="id"
                label="Técnico(s) responsável(is)"
                multiple
                chips
                variant="outlined"
                class="rounded-lg"
                density="compact"
                v-model="tecnicoSelecionados"
              />
            </v-col>
          </v-row>

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Adicionar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { createClients, attachTecnicos } from '@/services/client.service'
import { useTecnicoStore } from '@/stores/tecnico'
import TextInputComponent from '@/components/TextInputComponent.vue'

const clientsStore = useClientsStore()
const tecnicoStore = useTecnicoStore()

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  cep: '',
  endereco: '',
})

const tecnicoSelecionados = ref<number[]>([])

onMounted(() => {
  tecnicoStore.fetchTecnicos()
})

async function adicionarTecnicos(clientId: number) {
  if (!tecnicoSelecionados.value.length) return

  await attachTecnicos(clientId, tecnicoSelecionados.value)
}

async function saveClient() {
  try {
    const client = await createClients(form.value)
    await adicionarTecnicos(client.id)
    clientsStore.addClient(client)
  } catch (error) {
    console.error('Erro ao salvar o cliente:', error)
  }
}
</script>
