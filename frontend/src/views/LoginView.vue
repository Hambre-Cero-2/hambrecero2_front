<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login, saveSession } from '../services/authService'

const router = useRouter()
const route = useRoute()

const credentials = ref({
  username: '',
  password: '',
})

const errorMessage = ref('')
const loading = ref(false)

const submitLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await login(credentials.value)

    saveSession(response.data)

    const redirectTo = route.query.redirect || '/dashboard'
    router.push(redirectTo)
  } catch (error) {
    errorMessage.value = 'Login failed. Check username and password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="card">
    <h2>Login</h2>

    <form @submit.prevent="submitLogin">
      <input
        v-model="credentials.username"
        placeholder="Username"
        required
      />

      <input
        v-model="credentials.password"
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error">
      {{ errorMessage }}
    </p>
  </div>
</template>