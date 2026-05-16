<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { deleteRecipe, getRecipes } from '../../services/recipeService'
import { getUserRole } from '../../services/authService'

const recipes = ref([])
const loading = ref(false)
const error = ref('')

const isAdmin = computed(() => getUserRole() === 'ADMIN')

const loadRecipes = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getRecipes()
    recipes.value = response.data || []
  } catch (err) {
    console.error(err)
    error.value = 'Could not load recipes'
  } finally {
    loading.value = false
  }
}

const removeRecipe = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this recipe?')

  if (!confirmed) {
    return
  }

  try {
    await deleteRecipe(id)
    await loadRecipes()
  } catch (err) {
    console.error(err)
    error.value = 'Could not delete recipe'
  }
}

const getRecipeVegetarianValue = (recipe) => {
  return recipe.vegetarian ?? recipe.isVegetarian ?? false
}

const getRecipeImageValue = (recipe) => {
  return recipe.imageName ?? recipe.imageUrl ?? ''
}

const getRecipeImageSrc = (recipe) => {
  const image = getRecipeImageValue(recipe)

  if (!image) {
    return ''
  }

  if (image.startsWith('http')) {
    return image
  }

  if (image.startsWith('/images/')) {
    return image
  }

  return `/images/${image}`
}

onMounted(loadRecipes)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Recipes
        </span>

        <h2>Recipe catalogue</h2>

        <p>
          Browse recipes and open each one to see the full information.
          <span v-if="isAdmin">
            As admin, you can create, edit and delete recipes.
          </span>
          <span v-else>
            You have read-only access.
          </span>
        </p>
      </div>

      <RouterLink
        v-if="isAdmin"
        class="btn"
        to="/recipes/new"
      >
        Add recipe
      </RouterLink>
    </div>

    <div v-if="loading" class="card">
      Loading recipes...
    </div>

    <div v-else-if="error" class="card error">
      {{ error }}
    </div>

    <div v-else-if="recipes.length === 0" class="card empty-state">
      No recipes found.
    </div>

    <div v-else class="recipe-card-grid">
      <article
        v-for="recipe in recipes"
        :key="recipe.id"
        class="card recipe-summary-card"
      >
        <RouterLink
          class="recipe-summary-link"
          :to="`/recipes/${recipe.id}`"
        >
          <img
            v-if="getRecipeImageSrc(recipe)"
            :src="getRecipeImageSrc(recipe)"
            :alt="recipe.name"
            class="recipe-summary-image"
          />

          <div
            v-else
            class="recipe-summary-placeholder"
          >
            No image
          </div>

          <div class="recipe-summary-content">
            <h3>{{ recipe.name }}</h3>

            <span
              class="badge"
              :class="{ 'badge-success': getRecipeVegetarianValue(recipe) }"
            >
              {{ getRecipeVegetarianValue(recipe) ? 'Vegetarian' : 'Non vegetarian' }}
            </span>
          </div>
        </RouterLink>

        <div class="actions recipe-summary-actions">
          <RouterLink
            class="btn btn-outline"
            :to="`/recipes/${recipe.id}`"
          >
            View detail
          </RouterLink>

          <RouterLink
            v-if="isAdmin"
            class="btn"
            :to="`/recipes/${recipe.id}/edit`"
          >
            Edit
          </RouterLink>

          <button
            v-if="isAdmin"
            type="button"
            class="btn btn-danger"
            @click="removeRecipe(recipe.id)"
          >
            Delete
          </button>
        </div>
      </article>
    </div>
  </section>
</template>