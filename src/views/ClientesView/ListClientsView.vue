<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'

const clientsStore = useClientsStore()

const search = ref('')

onMounted(() => {
  if (!clientsStore.clients.length) {
    clientsStore.fetchClients()
  }
})

const filteredClients = computed(() => {
  if (!search.value) {
    return clientsStore.clients
  }

  return clientsStore.clients.filter(client =>
    client.nome.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <v-container fluid class="pa-6">
    <!-- Barra de ferramentas com busca e filtros -->
    <v-row class="mb-3 d-flex justify-end align-center">
      <v-col cols="auto">
        <!-- Campo de busca -->
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar cliente"
          variant="underlined"
          hide-details
          dense
          min-width="300"
        />
      </v-col>
      <v-col cols="auto">
        <!-- Botão de filtro -->
        <v-btn
          icon="mdi-filter-variant"
          variant="text"
          elevation="1"
          size="small"
        />
      </v-col>
    </v-row>

    <!-- Grid de clientes -->
    <v-row class="ga-0" no-gutters>
      <v-col
        v-for="client in filteredClients"
        :key="client.id"
        cols="12"
        md="6"
        class="pa-3"
      >
        <v-card
          rounded="lg"
          class="pa-3"
        >
          <v-card-text class="pa-1">
            <v-row>
              <v-col>
                <div class="d-flex flex-column ga-2">
                  <span class="text-h5 font-weight-bold">{{ client.nome }}</span>
                  <span class="text-subtitle-1 ma-0">{{ client.email }}</span>
                  <span class="text-subtitle-1 ma-0">{{ client.telefone }}</span>
                </div>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn icon="mdi-arrow-right" elevation="0"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
