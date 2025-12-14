<script setup lang="ts">
import TextInputComponent from '@/components/TextInputComponent.vue'
import { useClientsStore } from '@/stores/clients'
import { useTipoAmostraStore } from '@/stores/tipoAmostra';
import { onMounted } from 'vue';

const clientsStore = useClientsStore()
const tipoAmostraStore = useTipoAmostraStore()

onMounted(() => {
  clientsStore.fetchClients()
  tipoAmostraStore.fetchTipoAmostras()
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Cadastrar amostra</span>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent>
          <v-file-input
            label="Foto da amostra"
            prepend-icon="mdi-camera"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Cliente"
            :items="clientsStore.clients.map(client => client.nome)"
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
            :items="tipoAmostraStore.tipoAmostras.map(tipo => tipo.nome)"
            variant="outlined"
            density="compact"
          />

          <v-select
            label="Processos"
            :items="['FRX', 'DRX', 'Moagem']"
            variant="outlined"
            density="compact"
          />

          <v-text-field
            label="Data de recebimento"
            type="date"
            variant="outlined"
            density="compact"
          />

          <div class="d-flex flex-column flex-md-row ga-3 justify-md-end">
            <v-btn color="#FF1A1A" type="reset">Limpar campos</v-btn>
            <v-btn color="#00A400" type="submit">Adicionar</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
