<script setup>
import { computed, onMounted, ref } from 'vue'
import { getDashboardData } from '../../services/dashboardService'

const recipes = ref([])
const ingredients = ref([])

const loading = ref(false)
const error = ref('')

const searchText = ref('')
const vegetarianFilter = ref('ALL')
const difficultyFilter = ref('ALL')
const sortBy = ref('name')

const loadDashboard = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await getDashboardData()
    recipes.value = data.recipes
    ingredients.value = data.ingredients
  } catch (err) {
    console.error(err)
    error.value = 'Could not load dashboard data'
  } finally {
    loading.value = false
  }
}

const filteredRecipes = computed(() => {
  let result = [...recipes.value]

  if (searchText.value.trim() !== '') {
    const search = searchText.value.toLowerCase()

    result = result.filter((recipe) =>
      recipe.name?.toLowerCase().includes(search)
    )
  }

  if (vegetarianFilter.value !== 'ALL') {
    const isVegetarian = vegetarianFilter.value === 'YES'
    result = result.filter((recipe) => recipe.vegetarian === isVegetarian)
  }

  if (difficultyFilter.value !== 'ALL') {
    const difficulty = Number(difficultyFilter.value)
    result = result.filter((recipe) => recipe.difficulty === difficulty)
  }

  result.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    }

    if (sortBy.value === 'difficulty') {
      return a.difficulty - b.difficulty
    }

    if (sortBy.value === 'estimatedCost') {
      return Number(a.estimatedCost) - Number(b.estimatedCost)
    }

    return 0
  })

  return result
})

const totalRecipes = computed(() => recipes.value.length)

const totalIngredients = computed(() => ingredients.value.length)

const vegetarianRecipes = computed(() =>
  recipes.value.filter((recipe) => recipe.vegetarian).length
)

const averageCost = computed(() => {
  if (recipes.value.length === 0) {
    return 0
  }

  const total = recipes.value.reduce(
    (sum, recipe) => sum + Number(recipe.estimatedCost || 0),
    0
  )

  return total / recipes.value.length
})

onMounted(loadDashboard)
</script>

<template>
  <section>
    <h2>Dashboard</h2>

    <p>
      General overview of recipes and ingredients related to sustainable food.
    </p>

    <div v-if="loading" class="card">
      Loading dashboard data...
    </div>

    <div v-else-if="error" class="card error">
      {{ error }}
    </div>

    <div v-else>
      <div class="dashboard-summary">
        <div class="card summary-card">
          <span class="summary-label">Total recipes</span>
          <strong>{{ totalRecipes }}</strong>
        </div>

        <div class="card summary-card">
          <span class="summary-label">Total ingredients</span>
          <strong>{{ totalIngredients }}</strong>
        </div>

        <div class="card summary-card">
          <span class="summary-label">Vegetarian recipes</span>
          <strong>{{ vegetarianRecipes }}</strong>
        </div>

        <div class="card summary-card">
          <span class="summary-label">Average cost</span>
          <strong>{{ averageCost.toFixed(2) }} €</strong>
        </div>
      </div>

      <div class="card filters-card">
        <h3>Explore recipes</h3>

        <div class="filters">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search recipe by name"
          />

          <select v-model="vegetarianFilter">
            <option value="ALL">All recipes</option>
            <option value="YES">Vegetarian</option>
            <option value="NO">Non vegetarian</option>
          </select>

          <select v-model="difficultyFilter">
            <option value="ALL">All difficulties</option>
            <option value="1">Difficulty 1</option>
            <option value="2">Difficulty 2</option>
            <option value="3">Difficulty 3</option>
            <option value="4">Difficulty 4</option>
            <option value="5">Difficulty 5</option>
          </select>

          <select v-model="sortBy">
            <option value="name">Sort by name</option>
            <option value="difficulty">Sort by difficulty</option>
            <option value="estimatedCost">Sort by cost</option>
          </select>
        </div>
      </div>

      <div v-if="filteredRecipes.length === 0" class="card">
        No recipes found with the selected filters.
      </div>

      <table v-else class="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Vegetarian</th>
            <th>Estimated cost</th>
            <th>Servings</th>
            <th>Last modified</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
          >
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.difficulty }}</td>
            <td>{{ recipe.vegetarian ? 'Yes' : 'No' }}</td>
            <td>{{ recipe.estimatedCost }} €</td>
            <td>{{ recipe.servings }}</td>
            <td>{{ recipe.lastModified }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>