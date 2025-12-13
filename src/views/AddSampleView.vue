<template>
  <v-container class="py-10" style="max-width: 1166px">

    <v-row>
        <v-col cols="6" md="6">
            <!-- Preview da imagem -->
            <v-img
                v-if="imagePreview"
                :src="imagePreview"
                max-height="317"
                class="rounded-lg"
                cover
            />
            <!-- Foto da Amostra -->
            <v-file-input
                v-model="form.foto"
                label="Foto da Amostra"
                prepend-icon="mdi-camera"
                class="mt-5 rounded-lg"
                accept="image/*"
                @update:model-value="onFileChange"
            />
        </v-col>
    </v-row>

    <v-row dense>
        <!-- Identificação da Amostra -->
        <v-col cols="12" md="6">
            <TextInputComponent
            v-model="form.identificacao"
            placeholder-props="Identificação da Amostra"
            prepend-icon-props="mdi-email"
            />
        </v-col>

        <!-- Tipo da Amostra -->
        <v-col cols="12" md="6">
            <v-select
            v-model="form.tipo"
            :items="tipoAmostra"
            label="Tipo da Amostra"
            multiple
            chips
            variant="outlined"
            class="mt-5 rounded-lg"
            />
        </v-col>

      <!-- Cliente -->
        <v-col cols="12" md="6">
            <TextInputComponent
            v-model="form.cliente"
            placeholder-props="Cliente"
            prepend-icon-props="mdi-account"
        />
        </v-col>
      
        <!-- Processos -->
        <v-col cols="12" md="6">
          <TextInputComponent
            v-model="form.processos"
            placeholder-props="Processos"
            prepend-icon-props="mdi-file-document"
          />
        </v-col>

    </v-row>

    <!-- Botões -->
    <v-row justify="end" class="mt-10">
      <v-col cols="auto">
        <v-btn color="#FF1A1A" @click="limparCampos"> Limpar campos </v-btn>
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
interface SampleForm {
    foto: File | null
    cliente: string
    identificacao: string
    tipo: string[]
    processos: string
}
const form = ref<SampleForm>({
    foto: null,
    cliente: '',
    identificacao: '',
    tipo: [],
    processos: '',
})

// Lista de tipos de amostra
const tipoAmostra = ['Rocha', 'Areia']

// Preview da imagem
const imagePreview = ref<string | null>(null)

// Quando o arquivo mudar
function onFileChange(file: File | File[] | null) {
  if (!file) {
    form.value.foto = null
    imagePreview.value = null
    return
  }
  const selectedFile = Array.isArray(file) ? file[0] : file
  if (selectedFile instanceof File){
    form.value.foto = selectedFile
    imagePreview.value = URL.createObjectURL(selectedFile)  
  }
}

function limparCampos() {
    form.value = {
        foto: null,
        cliente: '',
        identificacao: '',
        tipo: [],
        processos: '',
    }
    imagePreview.value = null
}

</script>