<template>
  <v-row class="ma-0">
    <v-col cols="12" md="6" class="d-flex pa-0 ma-0">
      <v-img src="/imagem.jpg" alt="Imagem" cover/>
    </v-col>

    <v-col cols="12" md="6" class="form-area px-8">
      <div class="container-logo w-100">
        <img class="logo-img my-4" src="@/assets/logo.png" alt="Logo" />
      </div>

      <div class="welcome-text mb-8">
        <h2>Olá, seja bem-vindo(a)!</h2>
        <h1>
          <span class="ct">CT</span>
          <span class="mineral">Mineral</span>
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1 mt-2">
          Utilize sua conta institucional para acessar o sistema.
        </p>
      </div>

      <v-btn
        block
        class="btn-login"
        size="x-large"
        :loading="authStore.loading"
        prepend-icon="mdi-login"
        @click="handleLogin"
        max-height="60"
      >
        Entrar com SUAP
      </v-btn>

      <v-alert v-if="authStore.error" type="error" class="mt-4" variant="tonal">
        {{ authStore.error }}
      </v-alert>

      <v-divider class="my-8"></v-divider>

      <p class="text-caption text-center text-grey">
        Ao clicar em entrar, você será redirecionado para a autenticação oficial do IFRN.
      </p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

async function handleLogin() {
  try {
    await authStore.login()
  } catch (error) {
    console.error('Erro ao iniciar login:', error)
  }
}
</script>

<style scoped>
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
  font-size: 20px;
  font-weight: 700;
  color: white;
  border-radius: 8px;
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
