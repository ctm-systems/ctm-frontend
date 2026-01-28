<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTecnicoStore } from '@/stores/tecnico'
import { useAuthStore } from '@/stores/auth'
import type { Tecnico } from '@/types/Tecnico'
import TextInputComponent from '@/components/TextInputComponent.vue'

const tecnicoStore = useTecnicoStore()
const authStore = useAuthStore()

interface UserForm {
  nome: string
  matricula: string
  role_nome: string
}

const search = ref('')
const dialogAdd = ref(false)
const dialogEdit = ref(false)
const page = ref(1)
const itemsPerPage = 5

const rolesOptions = ['diretor', 'tecnico']

const userForm = ref<UserForm>({
  nome: '',
  matricula: '',
  role_nome: 'tecnico'
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

const addUser = () => {
  userForm.value = {
    nome: '',
    matricula: '',
    role_nome: 'tecnico'
  }
  editingTecnico.value = null
  dialogAdd.value = true
}

const editUser = (tecnico: Tecnico) => {
  userForm.value = {
    nome: tecnico.nome,
    matricula: tecnico.matricula,
    role_nome: tecnico.roles?.[0]?.nome || 'tecnico'
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
    userForm.value = { nome: '', matricula: '', role_nome: 'tecnico' }
  }
}

const saveEditedUser = async () => {
  if (userForm.value.nome && userForm.value.matricula && editingTecnico.value) {
    await tecnicoStore.updateTecnico(editingTecnico.value.id, userForm.value)
    dialogEdit.value = false
    userForm.value = { nome: '', matricula: '', role_nome: 'tecnico' }
    editingTecnico.value = null
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
        <v-card class="pa-6 rounded-lg" elevation="2">
          <v-row>
            <v-col cols="12" md="4">
              <text-input-component v-model="search" prepend-inner-icon="mdi-magnify" label="Pesquisar" variant="outlined" density="compact" />
            </v-col>
            <v-col cols="12" md="8" class="d-flex justify-end">
              <v-btn v-if="authStore.isDiretor" color="#00A400" @click="addUser">Adicionar Técnico</v-btn>
            </v-col>
          </v-row>

          <v-table class="mt-4">
            <thead>
              <tr>
                <th class="text-subtitle-1 font-weight-bold">Matrícula</th>
                <th class="text-subtitle-1 font-weight-bold">Nome</th>
                <th class="text-subtitle-1 font-weight-bold">Cargo</th>
                <th class="text-subtitle-1 font-weight-bold text-center" style="width: 120px">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="text-subtitle-1 font-weight-regular">{{ user.matricula }}</td>
                <td class="text-subtitle-1 font-weight-regular">{{ user.nome }}</td>
                <td>
                  <v-chip size="small" :color="user.roles?.[0]?.nome === 'diretor' ? 'red' : 'blue'" label class="text-subtitle-2">
                    {{ user.roles?.[0]?.nome === 'diretor' ? 'Diretor' : 'Técnico' }}
                  </v-chip>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-center ga-2" v-if="authStore.isDiretor">
                    <v-btn icon="mdi-pencil" variant="text" color="primary" @click="editUser(user)"/>
                    <v-btn icon="mdi-delete" variant="text" color="error" @click="deleteUser(user)"/>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogAdd" max-width="500">
    <v-card>
      <v-card-title class="pa-4 font-weight-bold">Adicionar Técnico</v-card-title>
      <v-card-text>
        <v-text-field v-model="userForm.matricula" label="Matrícula" variant="outlined" density="compact" />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
        <v-select v-model="userForm.role_nome" :items="rolesOptions" label="Tipo de Usuário" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogAdd = false">Cancelar</v-btn>
        <v-btn variant="outlined" color="#00A400" @click="saveNewUser" :loading="tecnicoStore.isLoading">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogEdit" max-width="500">
    <v-card>
      <v-card-title class="pa-4 font-weight-bold">Editar Técnico</v-card-title>
      <v-card-text>
        <v-text-field v-model="userForm.matricula" label="Matrícula" variant="outlined" density="compact" />
        <v-text-field v-model="userForm.nome" label="Nome" variant="outlined" density="compact" />
        <v-select v-model="userForm.role_nome" :items="rolesOptions" label="Tipo de Usuário" variant="outlined" density="compact" />
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="dialogEdit = false">Cancelar</v-btn>
        <v-btn variant="outlined" color="primary" @click="saveEditedUser" :loading="tecnicoStore.isLoading">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
