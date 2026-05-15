<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import {
  getUsername,
  getUserRole,
  isLoggedIn,
  logout,
} from './services/authService'

const router = useRouter()
const route = useRoute()

const loggedIn = computed(() => {
  route.fullPath
  return isLoggedIn()
})

const username = computed(() => {
  route.fullPath
  return getUsername()
})

const role = computed(() => {
  route.fullPath
  return getUserRole()
})

const isAdmin = computed(() => role.value === 'ADMIN')

const doLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div>
          <h1>Zero Hunger Recipes</h1>
          <p class="header-subtitle">
            Sustainable recipes and ingredients dashboard
          </p>
        </div>

        <nav>
          <RouterLink to="/">
            Home
          </RouterLink>

          <RouterLink v-if="loggedIn" to="/dashboard">
            Dashboard
          </RouterLink>

          <RouterLink to="/recipes">
            Recipes
          </RouterLink>

          <RouterLink to="/ingredients">
            Ingredients
          </RouterLink>

          <RouterLink v-if="!loggedIn" to="/login">
            Login
          </RouterLink>

          <span v-if="loggedIn" class="user-chip">
            {{ username || 'User' }} · {{ isAdmin ? 'Admin' : 'User' }}
          </span>

          <button
            v-if="loggedIn"
            type="button"
            class="btn btn-light"
            @click="doLogout"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>