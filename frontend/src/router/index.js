import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import RecipeListView from '../views/recipes/RecipeListView.vue'
import RecipeCreateView from '../views/recipes/RecipeCreateView.vue'
import RecipeEditView from '../views/recipes/RecipeEditView.vue'

import IngredientListView from '../views/ingredients/IngredientListView.vue'
import IngredientCreateView from '../views/ingredients/IngredientCreateView.vue'
import IngredientEditView from '../views/ingredients/IngredientEditView.vue'

import DashboardView from '../views/dashboard/DashboardView.vue'

import { isLoggedIn, getUserRole } from '../services/authService'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/login',
    component: LoginView,
  },

  {
    path: '/recipes',
    component: RecipeListView,
  },
  {
    path: '/recipes/new',
    component: RecipeCreateView,
    meta: {
      requiresAuth: true,
      role: 'ADMIN',
    },
  },
  {
    path: '/recipes/:id/edit',
    component: RecipeEditView,
    meta: {
      requiresAuth: true,
      role: 'ADMIN',
    },
  },

  {
    path: '/ingredients',
    component: IngredientListView,
  },
  {
    path: '/ingredients/new',
    component: IngredientCreateView,
    meta: {
      requiresAuth: true,
      role: 'ADMIN',
    },
  },
  {
    path: '/ingredients/:id/edit',
    component: IngredientEditView,
    meta: {
      requiresAuth: true,
      role: 'ADMIN',
    },
  },

  {
    path: '/dashboard',
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const loggedIn = isLoggedIn()
  const userRole = getUserRole()

  if (to.path === '/login' && loggedIn) {
    return '/dashboard'
  }

  if (to.meta.requiresAuth && !loggedIn) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.meta.role && userRole !== to.meta.role) {
    return '/dashboard'
  }

  return true
})

export default router