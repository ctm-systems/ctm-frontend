<template>
  <v-container fluid class="login-page">
    <v-row class="fill-height">
      
      <!-- COLUNA ESQUERDA - IMAGEM DO TRABALHADOR -->
      <v-col cols="12" md="6" class="left-area">
        <!-- Imagem do trabalhador -->
        <img
          class="worker-img"
          src="@/assets/worker.png"
          alt="Trabalhador"
        />

        <!-- Logo superior esquerda -->
        <img
          class="logo-img"
          src="@/assets/logo.png"
          alt="Logo"
        />
      </v-col>

      <!-- COLUNA DIREITA - FORMULÁRIO -->
      <v-col cols="12" md="6" class="form-area">

        <div class="welcome-text">
          <h2>Olá, seja bem-vindo(a)!</h2>
          <h1>
            <span class="ct">CT</span>
            <span class="mineral">Mineral</span>
          </h1>
        </div>

        <v-form @submit.prevent="login">

          <!-- INPUT USUÁRIO -->
          <v-text-field
            v-model="username"
            variant="outlined"
            placeholder="Informe seu usuário"
            prepend-inner-icon="mdi-account"
            class="input-field"
          />

          <!-- INPUT SENHA -->
          <v-text-field
            v-model="password"
            variant="outlined"
            placeholder="Informe sua senha"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            class="input-field"
          />

          <!-- BOTÃO ENTRAR -->
          <v-btn
            type="submit"
            block
            class="btn-login"
            size="x-large"
          >
            Acessar
          </v-btn>
        </v-form>

        <!-- ESQUECEU A SENHA -->
        <div class="forgot">
          Esqueceu a senha?
          <a href="#">Clique aqui</a>
        </div>

      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const showPassword = ref(false);

function login() {
  console.log("Login:", username.value, password.value);
}
</script>

<style scoped>
.login-page {
  background: #f3f3f3;
  min-height: 100vh;
  overflow: hidden;
}

/* --- LEFT SIDE --- */
.left-area {
  position: relative;
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.worker-img {
  width: 75%;
  max-width: 500px;
  position: absolute;
  bottom: 0;
}

/* logo superior esquerda */
.logo-img {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 110px;
}

/* --- RIGHT SIDE --- */
.form-area {
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-text h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.welcome-text h1 {
  font-size: 48px;
  font-weight: 900;
}

.ct {
  color: #ff8a00; /* Laranja */
}

.mineral {
  color: #006d55; /* Verde escuro */
}

/* Inputs */
.input-field {
  margin-top: 20px;
  border-radius: 15px;
}

/* Botão Acessar */
.btn-login {
  margin-top: 35px;
  padding: 15px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  border-radius: 40px;
  background: linear-gradient(90deg, #007965, #004d3d);
}

/* Esqueceu a senha */
.forgot {
  margin-top: 25px;
  text-align: center;
  font-size: 16px;
  color: #555;
}

.forgot a {
  color: #ff8a00;
  font-weight: 600;
  text-decoration: none;
}

.forgot a:hover {
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 960px) {
  .worker-img {
    display: none;
  }
  .logo-img {
    display: none;
  }
  .form-area {
    padding: 30px;
    text-align: center;
  }
}
</style>
