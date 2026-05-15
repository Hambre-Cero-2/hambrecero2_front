import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RecipeListView from '../views/recipes/RecipeListView.vue'
import RecipeCreateView from '../views/recipes/RecipeCreateView.vue'
import IngredientListView from '../views/ingredients/IngredientListView.vue'
import IngredientCreateView from '../views/ingredients/IngredientCreateView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/recipes', component: RecipeListView },
  { path: '/recipes/new', component: RecipeCreateView },
  { path: '/ingredients', component: IngredientListView },
  { path: '/ingredients/new', component: IngredientCreateView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router