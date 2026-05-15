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

const getRecipeCostValue = (recipe) => {
  return Number(recipe.estimatedCost ?? recipe.estimated_cost ?? 0)
}

const getRecipeLastModifiedValue = (recipe) => {
  return recipe.lastModified ?? recipe.last_modified ?? ''
}

const getRecipeImageValue = (recipe) => {
  return recipe.imageUrl ?? recipe.imageName ?? ''
}

const getRecipeImageSrc = (recipe) => {
  const image = getRecipeImageValue(recipe)

  if (!image) {
    return ''
  }

  return image.startsWith('/images/') ? image : `/images/${image}`
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
          Browse all available recipes.
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

    <div v-else class="grid-list">
      <article
        v-for="recipe in recipes"
        :key="recipe.id"
        class="card item-card"
      >
        <img
          v-if="getRecipeImageSrc(recipe)"
          :src="getRecipeImageSrc(recipe)"
          :alt="recipe.name"
          class="recipe-image"
        />

        <div class="item-card-header">
          <div>
            <h3>{{ recipe.name }}</h3>
            <p>
              Difficulty {{ recipe.difficulty }} · {{ recipe.servings }} serving(s)
            </p>
          </div>

          <span
            class="badge"
            :class="{ 'badge-success': getRecipeVegetarianValue(recipe) }"
          >
            {{ getRecipeVegetarianValue(recipe) ? 'Vegetarian' : 'Non vegetarian' }}
          </span>
        </div>

        <div class="details-grid">
          <div>
            <span>Estimated cost</span>
            <strong>{{ getRecipeCostValue(recipe).toFixed(2) }} €</strong>
          </div>

          <div>
            <span>Last modified</span>
            <strong>{{ getRecipeLastModifiedValue(recipe) || '-' }}</strong>
          </div>

          <div>
            <span>Image</span>
            <strong>{{ getRecipeImageValue(recipe) || '-' }}</strong>
          </div>
        </div>

        <div v-if="isAdmin" class="actions">
          <RouterLink
            class="btn"
            :to="`/recipes/${recipe.id}/edit`"
          >
            Edit
          </RouterLink>

          <button
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