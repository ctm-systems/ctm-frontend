<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTecnicoStore } from '@/stores/tecnico'
import type { Tecnico } from '@/types/Tecnico'
import TextInputComponent from '@/components/TextInputComponent.vue'

const tecnicoStore = useTecnicoStore()

const search = ref('')
const dialogAdd = ref(false)
const dialogEdit = ref(false)
const page = ref(1)
const itemsPerPage = 5
const userForm = ref<Partial<Tecnico>>({
  nome: '',
  matricula: ''
})
const editingTecnico = ref<Tecnico | null>(null)

const filteredUsers = computed(() => {
  let filtered = tecnicoStore.tecnicos

  if (search.value) {
    filtered = filtered.filter(tecnico =>
      tecnico.nome.toLowerCase().includes(search.value.toLowerCase()) ||
      tecnico.matricula.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = tecnicoStore.tecnicos

  if (search.value) {
    filtered = filtered.filter(tecnico =>
      tecnico.nome.toLowerCase().includes(search.value.toLowerCase()) ||
      tecnico.matricula.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return Math.ceil(filtered.length / itemsPerPage)
})

const addUser = () => {
  userForm.value = {
    nome: '',
    matricula: ''
  }
  editingTecnico.value = null
  dialogAdd.value = true
}

const editUser = (tecnico: Tecnico) => {
  userForm.value = {
    nome: tecnico.nome,
    matricula: tecnico.matricula
  }
  editingTecnico.value = tecnico
  dialogEdit.value = true
}

const deleteUser = async (tecnico: Tecnico) => {
  if (confirm(`Tem certeza que deseja excluir o técnico ${tecnico.nome}?`)) {
    await tecnicoStore.deleteTecnicoById(tecnico.id)
  }
}

const saveNewUser = async () => {
  if (userForm.value.nome && userForm.value.matricula) {
    await tecnicoStore.addTecnico(userForm.value)
    dialogAdd.value = false
    userForm.value = {
      nome: '',
      matricula: ''
    }
  }
}

const saveEditedUser = async () => {
  if (userForm.value.nome && userForm.value.matricula && editingTecnico.value) {
    await tecnicoStore.updateTecnico(editingTecnico.value.id, userForm.value)
    dialogEdit.value = false
    userForm.value = {
      nome: '',
      matricula: ''
    }
    editingTecnico.value = null
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
  tecnicoStore.fetchTecnicos()
})

watch(search, () => {
  page.value = 1
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <span class="text-h6 font-weight-bold">Gerenciamento de usuários</span>
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
              <v-btn color="#00A400" @click="addUser">Adicionar Técnico</v-btn>
            </v-col>
          </v-row>
          <v-divider class="mb-4"/>

          <v-progress-linear v-if="tecnicoStore.isLoading" indeterminate color="primary" class="mb-4" />

          <v-alert v-if="tecnicoStore.error" type="error" class="mb-4">
            {{ tecnicoStore.error }}
          </v-alert>

          <v-row>
            <v-col cols="12">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-subtitle-1 font-weight-bold">
                      Matrícula
                    </th>
                    <th class="text-subtitle-1 font-weight-bold">
                      Nome
                    </th>
                    <th class="text-center" style="width: 120px"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="filteredUsers.length === 0 && !tecnicoStore.isLoading">
                    <td colspan="3" class="text-center text-subtitle-1">
                      Nenhum técnico encontrado
                    </td>
                  </tr>
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="text-subtitle-1">
                      {{ user.matricula }}
                    </td>
                    <td class="text-subtitle-1">
                      {{ user.nome }}
                    </td>
                    <td class="text-center">
                      <div class="d-flex justify-center ga-2">
                        <v-btn icon="mdi-pencil" variant="text" color="primary" @click="editUser(user)"/>
                        <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteUser(user)"/>
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
      <v-card-title class="text-h6 font-weight-bold pa-4">Adicionar Técnico</v-card-title>
      <v-card-text class="px-4">
        <v-text-field
          v-model="userForm.matricula"
          label="Matrícula"
          variant="outlined"
          density="compact"
        />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogAdd = false">Cancelar</v-btn>
        <v-btn
          variant="outlined"
          color="#00A400"
          @click="saveNewUser"
          :loading="tecnicoStore.isLoading"
          :disabled="!userForm.nome || !userForm.matricula"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogEdit" max-width="500">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold pa-4">Editar Técnico</v-card-title>
      <v-card-text class="px-4">
        <v-text-field
          v-model="userForm.matricula"
          label="Matrícula"
          variant="outlined"
          density="compact"
        />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogEdit = false"> Cancelar </v-btn>
        <v-btn
          variant="outlined"
          color="primary"
          @click="saveEditedUser"
          :loading="tecnicoStore.isLoading"
          :disabled="!userForm.nome || !userForm.matricula"
        >
          Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
