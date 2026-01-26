<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useProcessStore } from '@/stores/process'
import type { Process } from '@/types/Process'
import TextInputComponent from '@/components/TextInputComponent.vue'

const processStore = useProcessStore()

const search = ref('')
const dialogAdd = ref(false)
const dialogEdit = ref(false)
const page = ref(1)
const itemsPerPage = 5
const processForm = ref<Partial<Process>>({
  nome: '',
  preco: ''
})
const editingProcess = ref<Process | null>(null)

const filteredProcesses = computed(() => {
  let filtered = processStore.processes

  if (search.value) {
    filtered = filtered.filter(process =>
      process.nome.toLowerCase().includes(search.value.toLowerCase()) ||
      process.preco.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = processStore.processes

  if (search.value) {
    filtered = filtered.filter(process =>
      process.nome.toLowerCase().includes(search.value.toLowerCase()) ||
      process.preco.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return Math.ceil(filtered.length / itemsPerPage)
})

const addProcess = () => {
  processForm.value = {
    nome: '',
    preco: ''
  }
  editingProcess.value = null
  dialogAdd.value = true
}

const editProcess = (process: Process) => {
  processForm.value = {
    nome: process.nome,
    preco: process.preco
  }
  editingProcess.value = process
  dialogEdit.value = true
}

const deleteProcess = async (process: Process) => {
  if (confirm(`Tem certeza que deseja excluir o processo ${process.nome}?`)) {
    await processStore.deleteProcessById(process.id)
  }
}

const saveNewProcess = async () => {
  if (processForm.value.nome && processForm.value.preco) {
    await processStore.addProcess(processForm.value)
    dialogAdd.value = false
    processForm.value = {
      nome: '',
      preco: ''
    }
  }
}

const saveEditedProcess = async () => {
  if (processForm.value.nome && processForm.value.preco && editingProcess.value) {
    await processStore.editProcess(editingProcess.value.id, processForm.value)
    dialogEdit.value = false
    processForm.value = {
      nome: '',
      preco: ''
    }
    editingProcess.value = null
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
  }
}

onMounted(() => {
  processStore.fetchProcesses()
})

watch(search, () => {
  page.value = 1
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerenciamento de processos</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          class="pa-6 rounded-lg"
          elevation="2"
        >
          <v-row>
            <v-col cols="12" md="4">
              <text-input-component
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Pesquisar"
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" md="8" class="d-flex justify-end">
              <v-btn color="#00A400" @click="addProcess">Adicionar Processo</v-btn>
            </v-col>
          </v-row>
          <v-divider class="mb-4"/>

          <v-progress-linear v-if="processStore.isLoading" indeterminate color="primary" class="mb-4" />

          <v-alert v-if="processStore.error" type="error" class="mb-4">
            {{ processStore.error }}
          </v-alert>

          <v-row>
            <v-col cols="12">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-subtitle-1 font-weight-bold">
                      Nome
                    </th>
                    <th class="text-subtitle-1 font-weight-bold">
                      Preço
                    </th>
                    <th class="text-center" style="width: 120px"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredProcesses.length === 0 && !processStore.isLoading">
                    <td colspan="3" class="text-center text-subtitle-1">
                      Nenhum processo encontrado
                    </td>
                  </tr>
                  <tr v-for="process in filteredProcesses" :key="process.id">
                    <td class="text-subtitle-1">
                      {{ process.nome }}
                    </td>
                    <td class="text-subtitle-1">
                      {{ process.preco }}
                    </td>
                    <td class="text-center">
                      <div class="d-flex justify-center ga-2">
                        <v-btn icon="mdi-pencil" variant="text" color="primary" @click="editProcess(process)"/>
                        <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteProcess(process)"/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end align-center">
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                :disabled="page === 1"
                @click="prevPage"
              />
              <span class="mx-2">Página {{ page }} de {{ totalPages }}</span>
              <v-btn
                icon="mdi-chevron-right"
                variant="text"
                :disabled="page === totalPages"
                @click="nextPage"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogAdd" max-width="500">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold pa-4">Adicionar Processo</v-card-title>
      <v-card-text class="px-4">
        <v-text-field
          v-model="processForm.nome"
          label="Nome"
          variant="outlined"
          density="compact"
        />
        <v-text-field v-model="processForm.preco" label="Preço" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogAdd = false">Cancelar</v-btn>
        <v-btn
          variant="outlined"
          color="#00A400"
          @click="saveNewProcess"
          :loading="processStore.isLoading"
          :disabled="!processForm.nome || !processForm.preco"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogEdit" max-width="500">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold pa-4">Editar Processo</v-card-title>
      <v-card-text class="px-4">
        <v-text-field
          v-model="processForm.nome"
          label="Nome"
          variant="outlined"
          density="compact"
        />
        <v-text-field v-model="processForm.preco" label="Preço" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogEdit = false"> Cancelar </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          @click="saveEditedProcess"
          :loading="processStore.isLoading"
          :disabled="!processForm.nome || !processForm.preco"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
