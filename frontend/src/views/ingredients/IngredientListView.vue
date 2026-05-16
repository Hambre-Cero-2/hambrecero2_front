<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  deleteIngredient,
  getIngredients,
} from '../../services/ingredientService'
import { getUserRole } from '../../services/authService'

const ingredients = ref([])
const loading = ref(false)
const error = ref('')

const isAdmin = computed(() => getUserRole() === 'ADMIN')

const loadIngredients = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getIngredients()
    ingredients.value = response.data || []
  } catch (err) {
    console.error(err)
    error.value = 'Could not load ingredients'
  } finally {
    loading.value = false
  }
}

const removeIngredient = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this ingredient?')

  if (!confirmed) {
    return
  }

  try {
    await deleteIngredient(id)
    await loadIngredients()
  } catch (err) {
    console.error(err)
    error.value = 'Could not delete ingredient'
  }
}

const getIngredientOrganicValue = (ingredient) => {
  return ingredient.organic ?? ingredient.isOrganic ?? false
}

onMounted(loadIngredients)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Ingredients
        </span>

        <h2>Ingredient catalogue</h2>

        <p>
          Browse ingredients and open each one to see the full information.
          <span v-if="isAdmin">
            As admin, you can create, edit and delete ingredients.
          </span>
          <span v-else>
            You have read-only access.
          </span>
        </p>
      </div>

      <RouterLink
        v-if="isAdmin"
        class="btn"
        to="/ingredients/new"
      >
        Add ingredient
      </RouterLink>
    </div>

    <div v-if="loading" class="card">
      Loading ingredients...
    </div>

    <div v-else-if="error" class="card error">
      {{ error }}
    </div>

    <div v-else-if="ingredients.length === 0" class="card empty-state">
      No ingredients found.
    </div>

    <div v-else class="ingredient-card-grid">
      <article
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="card ingredient-summary-card"
      >
        <RouterLink
          class="ingredient-summary-link"
          :to="`/ingredients/${ingredient.id}`"
        >
          <div class="ingredient-summary-icon">
            {{ ingredient.name?.charAt(0)?.toUpperCase() || '?' }}
          </div>

          <div class="ingredient-summary-content">
            <div>
              <h3>{{ ingredient.name }}</h3>
              <p>{{ ingredient.season || 'No season' }}</p>
            </div>

            <span
              class="badge"
              :class="{ 'badge-success': getIngredientOrganicValue(ingredient) }"
            >
              {{ getIngredientOrganicValue(ingredient) ? 'Organic' : 'Non organic' }}
            </span>
          </div>
        </RouterLink>

        <div class="actions ingredient-summary-actions">
          <RouterLink
            class="btn btn-outline"
            :to="`/ingredients/${ingredient.id}`"
          >
            View detail
          </RouterLink>

          <RouterLink
            v-if="isAdmin"
            class="btn"
            :to="`/ingredients/${ingredient.id}/edit`"
          >
            Edit
          </RouterLink>

          <button
            v-if="isAdmin"
            type="button"
            class="btn btn-danger"
            @click="removeIngredient(ingredient.id)"
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  </section>
</template>