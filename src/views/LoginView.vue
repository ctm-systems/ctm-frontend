<template>
  <v-row class="ma-0">

    <v-col cols="12" md="6" class="left-area">
      <!-- Área esquerda - Adicionar imagem -->
    </v-col>

    <!-- COLUNA DIREITA - FORMULÁRIO -->
    <v-col cols="12" md="6" class="form-area px-8">

      <div class="container-logo w-100">
        <img
          class="logo-img my-4"
          src="@/assets/logo.png"
          alt="Logo"
        />
      </div>

      <div class="welcome-text">
        <h2>Olá, seja bem-vindo(a)!</h2>
        <h1>
          <span class="ct">CT</span>
          <span class="mineral">Mineral</span>
        </h1>
      </div>

      <v-form @submit.prevent="handleLogin">

        <TextInputComponent
          v-model="username"
          :placeholder-props="'Informe sua matrícula'"
          :prepend-icon-props="'mdi-account'"
        />

        <TextInputComponent
          v-model="password"
          :placeholder-props="'Informe sua senha'"
          :type-props="showPassword ? 'text' : 'password'"
          :prepend-icon-props="'mdi-lock'"
          :append-icon-props="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <!-- BOTÃO ENTRAR -->
        <v-btn
          type="submit"
          block
          class="btn-login"
          size="x-large"
          :loading="authStore.loading"
        >
          Acessar
        </v-btn>

        <v-alert v-if="authStore.error" type="error" class="mt-4">{{ authStore.error }}</v-alert>
      </v-form>

    </v-col>

  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TextInputComponent from '@/components/TextInputComponent.vue'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleLogin() {
  try {
    await authStore.login(username.value, password.value)
    router.push('/app')
  } catch {}
}
</script>

<style scoped>

.left-area {
  background-color: grey;
}

.logo-img {
  width: 50px;
}

.form-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-text h2 {
  font-size: 24px;
  color: #333;
}

.welcome-text h1 {
  font-size: 48px;
  font-weight: 900;
}

.ct {
  color: #ff8a00;
}

.mineral {
  color: #006d55;
}

.btn-login {
  margin-top: 25px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  border-radius: 40px;
  background: linear-gradient(90deg, #007965, #004d3d);
}

@media (max-width: 960px) {
  .left-area {
    display: none;
  }

  .container-logo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-area {
    padding: 30px;
    text-align: center;
  }
}
</style>
