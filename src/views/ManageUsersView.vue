<script setup lang="ts">
import { ref, computed } from 'vue'
import TextInputComponent from '@/components/TextInputComponent.vue'
import type { User } from '@/types/User'

const users = ref<User[]>([
  { id: 1, matricula: '202910880010', nome: 'João Silva' },
  { id: 2, matricula: '202910880011', nome: 'Maria Santos' },
  { id: 3, matricula: '202910880012', nome: 'Pedro Oliveira' },
])

const search = ref('')
const page = ref(1)
const itemsPerPage = 10

const dialogAdd = ref(false)
const userForm = ref({
  matricula: '',
  nome: '',
})

const dialogEdit = ref(false)
const currentUser = ref<User | null>(null)

const filteredUsers = computed(() => {
  let filtered = users.value
  if (search.value) {
    filtered = filtered.filter(
      (u) =>
        u.nome.toLowerCase().includes(search.value.toLowerCase()) ||
        u.matricula.includes(search.value),
    )
  }
  const start = (page.value - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  let filtered = users.value
  if (search.value) {
    filtered = filtered.filter(
      (u) =>
        u.nome.toLowerCase().includes(search.value.toLowerCase()) ||
        u.matricula.includes(search.value),
    )
  }
  return Math.max(1, Math.ceil(filtered.length / itemsPerPage))
})

async function prevPage() {
  if (page.value > 1) page.value--
}

async function nextPage() {
  if (page.value < totalPages.value) page.value++
}

async function addUser() {
  userForm.value = { matricula: '', nome: '' }
  dialogAdd.value = true
}

function saveNewUser() {
  const newUser: User = {
    id: Math.max(...users.value.map((u) => u.id), 0) + 1,
    matricula: userForm.value.matricula,
    nome: userForm.value.nome,
  }
  users.value.push(newUser)
  dialogAdd.value = false
}

function editUser(user: User) {
  currentUser.value = user
  userForm.value = {
    matricula: user.matricula,
    nome: user.nome,
  }
  dialogEdit.value = true
}

async function saveEditedUser() {
  if (currentUser.value) {
    const index = users.value.findIndex((u) => u.id === currentUser.value!.id)
    if (index !== -1) {
      users.value[index] = {
        ...currentUser.value,
        matricula: userForm.value.matricula,
        nome: userForm.value.nome,
      }
    }
  }
  dialogEdit.value = false
}

async function deleteUser(user: User) {
  const index = users.value.findIndex((u) => u.id === user.id)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}
</script>

<template>
  <v-container fluid class="pa-8" style="background: #fff; min-height: 100vh">
    <v-row>
      <v-col cols="12">
        <h1
          class="font-weight-bold mb-6"
          style="font-size: 2.2rem; font-family: Poppins, sans-serif"
        >
          Usuários
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          class="pa-6"
          elevation="2"
          style="border-radius: 15px; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <v-row align="center" class="mb-4">
            <v-col cols="12" md="4">
              <text-input-component
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Pesquisar..."
                variant="outlined"
                density="compact"
              />
            </v-col>
            <v-col cols="12" md="8" class="d-flex justify-end mb-7">
              <v-btn color="#00A400" @click="addUser"> Adicionar </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mb-4" />
          <v-table>
            <thead>
              <tr>
                <th style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 18px">
                  Matrícula
                </th>
                <th style="font-family: Poppins, sans-serif; font-weight: 700; font-size: 18px">
                  Nome
                </th>
                <th class="text-center" style="width: 120px"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td
                  style="
                    font-family: Poppins, sans-serif;
                    font-weight: 700;
                    font-size: 15px;
                    color: #505050;
                  "
                >
                  {{ user.matricula }}
                </td>
                <td
                  style="
                    font-family: Poppins, sans-serif;
                    font-weight: 700;
                    font-size: 15px;
                    color: #505050;
                  "
                >
                  {{ user.nome }}
                </td>
                <td class="text-center">
                  <div class="d-flex justify-center ga-2">
                    <v-btn icon variant="text" color="primary" @click="editUser(user)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon variant="text" color="error" @click="deleteUser(user)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-row class="mt-4" align="center" justify="center">
            <v-col cols="auto">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                :disabled="page === 1"
                @click="prevPage"
              >
                <v-icon left>mdi-chevron-left</v-icon>
                Anterior
              </v-btn>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <span class="text-grey-darken-1 font-weight-bold text-h6">
                {{ page }} / {{ totalPages }}
              </span>
            </v-col>
            <v-col cols="auto">
              <v-btn
                variant="outlined"
                color="grey-darken-1"
                :disabled="page === totalPages"
                @click="nextPage"
              >
                Próximo
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialogAdd" max-width="500">
    <v-card>
      <v-card-title class="text-h5 pa-6">Adicionar Usuário</v-card-title>
      <v-card-text class="px-6">
        <v-text-field
          v-model="userForm.matricula"
          label="Matrícula"
          variant="outlined"
          density="compact"
          class="mb-4"
        />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogAdd = false"> Cancelar </v-btn>
        <v-btn variant="outlined" color="#00A400" @click="saveNewUser"> Confirmar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogEdit" max-width="500">
    <v-card>
      <v-card-title class="text-h5 pa-6">Editar Usuário</v-card-title>
      <v-card-text class="px-6">
        <v-text-field
          v-model="userForm.matricula"
          label="Matrícula"
          variant="outlined"
          density="compact"
          class="mb-4"
        />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogEdit = false"> Cancelar </v-btn>
        <v-btn variant="outlined" color="primary" @click="saveEditedUser"> Confirmar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.font-weight-bold {
  font-weight: 700;
}
</style>
