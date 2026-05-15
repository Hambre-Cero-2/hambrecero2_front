import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import RecipeListView from '../views/recipes/RecipeListView.vue'
import RecipeCreateView from '../views/recipes/RecipeCreateView.vue'
import RecipeEditView from '../views/recipes/RecipeEditView.vue'

import IngredientListView from '../views/ingredients/IngredientListView.vue'
import IngredientCreateView from '../views/ingredients/IngredientCreateView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import RecipeEditView from '../views/recipes/RecipeEditView.vue'
import IngredientEditView from '../views/ingredients/IngredientEditView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },

  { path: '/recipes', component: RecipeListView },
  { path: '/recipes/new', component: RecipeCreateView },
  { path: '/recipes/:id/edit', component: RecipeEditView },

  { path: '/ingredients', component: IngredientListView },
  { path: '/ingredients/new', component: IngredientCreateView },
  { path: '/ingredients/:id/edit', component: IngredientEditView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/recipes/:id/edit', component: RecipeEditView },
  { path: '/ingredients/:id/edit', component: IngredientEditView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router