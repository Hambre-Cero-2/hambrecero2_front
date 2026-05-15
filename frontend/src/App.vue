<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { isLoggedIn, logout } from './services/authService'

const router = useRouter()

const loggedIn = computed(() => isLoggedIn())

const doLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Zero Hunger Recipes</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/recipes">Recipes</RouterLink>
        <RouterLink to="/ingredients">Ingredients</RouterLink>

        <RouterLink v-if="loggedIn" to="/dashboard">Dashboard</RouterLink>
        <RouterLink v-if="!loggedIn" to="/login">Login</RouterLink>

        <button v-if="loggedIn" type="button" @click="doLogout">
          Logout
        </button>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>