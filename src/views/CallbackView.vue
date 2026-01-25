<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const code = route.query.code as string

  if (code) {
    try {
      await authStore.handleCallback(code)

      router.push('/app/clientes')
    } catch (error) {
      console.error('Erro na autenticação:', error)
      router.push({ name: 'login', query: { error: 'auth_failed' } })
    }
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <div class="callback-container">
    <div class="loader"></div>
    <p>Finalizando autenticação com SUAP...</p>
  </div>
</template>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ff8a00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
