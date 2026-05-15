<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

const router = useRouter()

const credentials = ref({
  username: '',
  password: '',
})

const error = ref('')

const handleLogin = async () => {
  try {
    const response = await login(credentials.value)

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('role', response.data.role)
    localStorage.setItem('username', response.data.username)

    window.location.href = '/'
  } catch (err) {
    error.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="card">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
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

      <button type="submit">
        Login
      </button>

      <p v-if="error">
        {{ error }}
      </p>
    </form>
  </div>
</template>