<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getDashboardData } from '../../services/dashboardService'
import { getUserRole, getUsername } from '../../services/authService'

const recipes = ref([])
const ingredients = ref([])

const loading = ref(false)
const error = ref('')

const searchText = ref('')
const vegetarianFilter = ref('ALL')
const difficultyFilter = ref('ALL')
const organicFilter = ref('ALL')
const dateFrom = ref('')
const dateTo = ref('')

const sortBy = ref('name')
const sortDirection = ref('asc')

const userRole = computed(() => getUserRole())
const username = computed(() => getUsername())
const isAdmin = computed(() => userRole.value === 'ADMIN')

const loadDashboard = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await getDashboardData()

    recipes.value = data.recipes || []
    ingredients.value = data.ingredients || []
  } catch (err) {
    console.error(err)
    error.value = 'Could not load dashboard data'
  } finally {
    loading.value = false
  }
}

const getRecipeVegetarianValue = (recipe) => {
  return recipe.vegetarian ?? recipe.isVegetarian ?? false
}

const getIngredientOrganicValue = (ingredient) => {
  return ingredient.organic ?? ingredient.isOrganic ?? false
}

const getRecipeCostValue = (recipe) => {
  return Number(recipe.estimatedCost ?? recipe.estimated_cost ?? 0)
}

const getRecipeLastModifiedValue = (recipe) => {
  return recipe.lastModified ?? recipe.last_modified ?? ''
}

const getIngredientPriceValue = (ingredient) => {
  return Number(ingredient.priceKg ?? ingredient.price_kg ?? 0)
}

const getIngredientCarbonFootprintValue = (ingredient) => {
  return Number(ingredient.carbonFootprint ?? ingredient.carbon_footprint ?? 0)
}

const getIngredientHarvestDateValue = (ingredient) => {
  return ingredient.harvestDate ?? ingredient.harvest_date ?? ''
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

    result = result.filter((recipe) =>
      getRecipeVegetarianValue(recipe) === isVegetarian
    )
  }

  if (difficultyFilter.value !== 'ALL') {
    const difficulty = Number(difficultyFilter.value)

    result = result.filter((recipe) =>
      Number(recipe.difficulty) === difficulty
    )
  }

  if (dateFrom.value) {
    result = result.filter((recipe) => {
      const lastModified = getRecipeLastModifiedValue(recipe)
      return lastModified && lastModified >= dateFrom.value
    })
  }

  if (dateTo.value) {
    result = result.filter((recipe) => {
      const lastModified = getRecipeLastModifiedValue(recipe)
      return lastModified && lastModified <= dateTo.value
    })
  }

  result.sort((a, b) => {
    let valueA = ''
    let valueB = ''

    if (sortBy.value === 'name') {
      valueA = a.name || ''
      valueB = b.name || ''
    }

    if (sortBy.value === 'difficulty') {
      valueA = Number(a.difficulty || 0)
      valueB = Number(b.difficulty || 0)
    }

    if (sortBy.value === 'estimatedCost') {
      valueA = getRecipeCostValue(a)
      valueB = getRecipeCostValue(b)
    }

    if (sortBy.value === 'servings') {
      valueA = Number(a.servings || 0)
      valueB = Number(b.servings || 0)
    }

    if (sortBy.value === 'lastModified') {
      valueA = getRecipeLastModifiedValue(a)
      valueB = getRecipeLastModifiedValue(b)
    }

    if (typeof valueA === 'string') {
      return sortDirection.value === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA)
    }

    return sortDirection.value === 'asc'
      ? valueA - valueB
      : valueB - valueA
  })

  return result
})

const filteredIngredients = computed(() => {
  let result = [...ingredients.value]

  if (searchText.value.trim() !== '') {
    const search = searchText.value.toLowerCase()

    result = result.filter((ingredient) =>
      ingredient.name?.toLowerCase().includes(search)
    )
  }

  if (organicFilter.value !== 'ALL') {
    const isOrganic = organicFilter.value === 'YES'

    result = result.filter((ingredient) =>
      getIngredientOrganicValue(ingredient) === isOrganic
    )
  }

  return result
})

const totalRecipes = computed(() => recipes.value.length)

const totalIngredients = computed(() => ingredients.value.length)

const vegetarianRecipes = computed(() =>
  recipes.value.filter((recipe) => getRecipeVegetarianValue(recipe)).length
)

const organicIngredients = computed(() =>
  ingredients.value.filter((ingredient) => getIngredientOrganicValue(ingredient)).length
)

const averageCost = computed(() => {
  if (recipes.value.length === 0) {
    return 0
  }

  const total = recipes.value.reduce(
    (sum, recipe) => sum + getRecipeCostValue(recipe),
    0
  )

  return total / recipes.value.length
})

const totalCarbonFootprint = computed(() => {
  return ingredients.value.reduce(
    (sum, ingredient) => sum + getIngredientCarbonFootprintValue(ingredient),
    0
  )
})

const changeSort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (column) => {
  if (sortBy.value !== column) {
    return ''
  }

  return sortDirection.value === 'asc' ? ' ↑' : ' ↓'
}

const resetFilters = () => {
  searchText.value = ''
  vegetarianFilter.value = 'ALL'
  difficultyFilter.value = 'ALL'
  organicFilter.value = 'ALL'
  dateFrom.value = ''
  dateTo.value = ''
  sortBy.value = 'name'
  sortDirection.value = 'asc'
}

onMounted(loadDashboard)
</script>

<template>
  <section>
    <div class="dashboard-hero">
      <div>
        <span class="eyebrow">
          {{ isAdmin ? 'Admin area' : 'User area' }}
        </span>

        <h2>
          {{ isAdmin ? 'Admin Dashboard' : 'Recipe Dashboard' }}
        </h2>

        <p>
          Welcome, {{ username || 'user' }}.
          Explore recipes, ingredients and sustainability data.
        </p>
      </div>

      <div v-if="isAdmin" class="hero-actions">
        <RouterLink class="btn btn-light" to="/recipes/new">
          New recipe
        </RouterLink>

        <RouterLink class="btn btn-secondary" to="/ingredients/new">
          New ingredient
        </RouterLink>
      </div>
    </div>

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
          <span class="summary-label">Organic ingredients</span>
          <strong>{{ organicIngredients }}</strong>
        </div>

        <div v-if="isAdmin" class="card summary-card admin-card">
          <span class="summary-label">Average recipe cost</span>
          <strong>{{ averageCost.toFixed(2) }} €</strong>
        </div>

        <div v-if="isAdmin" class="card summary-card admin-card">
          <span class="summary-label">Total carbon footprint</span>
          <strong>{{ totalCarbonFootprint.toFixed(2) }} kg CO₂</strong>
        </div>
      </div>

      <div class="card filters-card">
        <div class="section-title">
          <div>
            <h3>Explore recipes</h3>
            <p>
              Search, filter and sort the recipe information.
            </p>
          </div>

          <button type="button" class="btn btn-outline" @click="resetFilters">
            Reset filters
          </button>
        </div>

        <div class="filters">
          <input
            v-model="searchText"
            type="text"
            placeholder="Search by recipe or ingredient name"
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

          <input
            v-model="dateFrom"
            type="date"
            title="Date from"
          />

          <input
            v-model="dateTo"
            type="date"
            title="Date to"
          />

          <select v-if="isAdmin" v-model="organicFilter">
            <option value="ALL">All ingredients</option>
            <option value="YES">Organic ingredients</option>
            <option value="NO">Non organic ingredients</option>
          </select>
        </div>
      </div>

      <div class="card">
        <div class="section-title">
          <div>
            <h3>Recipes</h3>
            <p>
              {{ filteredRecipes.length }} result(s)
            </p>
          </div>

          <RouterLink v-if="isAdmin" class="btn" to="/recipes/new">
            Add recipe
          </RouterLink>
        </div>

        <div v-if="filteredRecipes.length === 0" class="empty-state">
          No recipes found with the selected filters.
        </div>

        <table v-else class="dashboard-table">
          <thead>
            <tr>
              <th @click="changeSort('name')">
                Name{{ getSortIcon('name') }}
              </th>
              <th @click="changeSort('difficulty')">
                Difficulty{{ getSortIcon('difficulty') }}
              </th>
              <th>
                Vegetarian
              </th>
              <th @click="changeSort('estimatedCost')">
                Estimated cost{{ getSortIcon('estimatedCost') }}
              </th>
              <th @click="changeSort('servings')">
                Servings{{ getSortIcon('servings') }}
              </th>
              <th @click="changeSort('lastModified')">
                Last modified{{ getSortIcon('lastModified') }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="recipe in filteredRecipes"
              :key="recipe.id"
            >
              <td>{{ recipe.name }}</td>
              <td>{{ recipe.difficulty }}</td>
              <td>{{ getRecipeVegetarianValue(recipe) ? 'Yes' : 'No' }}</td>
              <td>{{ getRecipeCostValue(recipe).toFixed(2) }} €</td>
              <td>{{ recipe.servings }}</td>
              <td>{{ getRecipeLastModifiedValue(recipe) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="isAdmin" class="card admin-section">
        <div class="section-title">
          <div>
            <h3>Ingredient overview</h3>
            <p>
              Admin-only ingredient management overview.
            </p>
          </div>

          <RouterLink class="btn" to="/ingredients/new">
            Add ingredient
          </RouterLink>
        </div>

        <div v-if="filteredIngredients.length === 0" class="empty-state">
          No ingredients found with the selected filters.
        </div>

        <table v-else class="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
              <th>Season</th>
              <th>Organic</th>
              <th>Price/kg</th>
              <th>Carbon footprint</th>
              <th>Harvest date</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="ingredient in filteredIngredients"
              :key="ingredient.id"
            >
              <td>{{ ingredient.name }}</td>
              <td>{{ ingredient.calories }}</td>
              <td>{{ ingredient.season }}</td>
              <td>{{ getIngredientOrganicValue(ingredient) ? 'Yes' : 'No' }}</td>
              <td>{{ getIngredientPriceValue(ingredient).toFixed(2) }} €</td>
              <td>{{ getIngredientCarbonFootprintValue(ingredient).toFixed(2) }} kg CO₂</td>
              <td>{{ getIngredientHarvestDateValue(ingredient) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>