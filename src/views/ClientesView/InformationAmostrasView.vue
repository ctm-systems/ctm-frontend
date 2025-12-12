<script setup lang="ts">
import CardInformationAmostraComponent from '@/components/CardInformationAmostraComponent.vue';

// Dados mock para demonstração
const amostraInfo = {
  tipoAmostra: 'Rocha (R)',
  identificacao: 'AMZ-01-PJ',
  processos: 'FRX, Perda ao fogo (PF), ...',
  foto: null
}

const arquivos = [
  { id: 1, nome: 'Arquivo 1', tipo: 'xlsx' },
  { id: 2, nome: 'Arquivo 2', tipo: 'pdf' },
  { id: 3, nome: 'Arquivo 3', tipo: 'xlsx' }
]
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <CardInformationAmostraComponent
          :identificacao="amostraInfo.identificacao"
          :tipoAmostra="amostraInfo.tipoAmostra"
          :processos="amostraInfo.processos"
          :foto="amostraInfo.foto"
        />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h2 class="text-h6 font-weight-bold">Planilhas</h2>
          </v-col>
          <v-col
            v-for="arquivo in arquivos"
            :key="arquivo.id"
            cols="12"
            md="3"
          >
            <v-card
              class="rounded-lg"
              elevation="2"
            >
              <v-card-text class="d-flex flex-column align-center justify-center h-100">
                <v-icon
                  size="80"
                  :color="arquivo.tipo === 'pdf' ? 'red-darken-2' : 'green-darken-2'"
                  class="mb-2"
                >
                  {{ arquivo.tipo === 'pdf' ? 'mdi-file-pdf-box' : 'mdi-file-excel-box' }}
                </v-icon>
                <span class="text-subtitle-1 font-weight-bold text-center">{{ arquivo.nome }}</span>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="text-subtitle-1 text-orange w-100"
                  variant="text"
                >
                  Baixar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
