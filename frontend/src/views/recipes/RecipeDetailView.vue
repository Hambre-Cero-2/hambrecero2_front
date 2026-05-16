<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteRecipe, getRecipeById } from '../../services/recipeService'
import { getUserRole } from '../../services/authService'

const route = useRoute()
const router = useRouter()

const recipe = ref(null)
const loading = ref(false)
const error = ref('')

const isAdmin = computed(() => getUserRole() === 'ADMIN')

const getRecipeVegetarianValue = (recipeValue) => {
  return recipeValue?.vegetarian ?? recipeValue?.isVegetarian ?? false
}

const getRecipeCostValue = (recipeValue) => {
  return Number(recipeValue?.estimatedCost ?? recipeValue?.estimated_cost ?? 0)
}

const getRecipeLastModifiedValue = (recipeValue) => {
  return recipeValue?.lastModified ?? recipeValue?.last_modified ?? ''
}

const getRecipeImageValue = (recipeValue) => {
  return recipeValue?.imageName ?? recipeValue?.imageUrl ?? ''
}

const getRecipeImageSrc = (recipeValue) => {
  const image = getRecipeImageValue(recipeValue)

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

const loadRecipe = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getRecipeById(route.params.id)
    recipe.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Could not load recipe detail'
  } finally {
    loading.value = false
  }
}

const removeRecipe = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this recipe?')

  if (!confirmed) {
    return
  }

  try {
    await deleteRecipe(route.params.id)
    router.push('/recipes')
  } catch (err) {
    console.error(err)
    error.value = 'Could not delete recipe'
  }
}

onMounted(loadRecipe)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Recipe detail
        </span>

        <h2>{{ recipe?.name || 'Recipe' }}</h2>

        <p>
          Full information about this recipe.
        </p>
      </div>

      <RouterLink
        class="btn btn-outline"
        to="/recipes"
      >
        Back to recipes
      </RouterLink>
    </div>

    <div v-if="loading" class="card">
      Loading recipe...
    </div>

    <div v-else-if="error" class="card error">
      {{ error }}
    </div>

    <div v-else-if="!recipe" class="card empty-state">
      Recipe not found.
    </div>

    <article v-else class="card recipe-detail-card">
      <div class="recipe-detail-layout">
        <div class="recipe-detail-image-wrapper">
          <img
            v-if="getRecipeImageSrc(recipe)"
            :src="getRecipeImageSrc(recipe)"
            :alt="recipe.name"
            class="recipe-detail-image"
          />

          <div
            v-else
            class="recipe-detail-placeholder"
          >
            No image available
          </div>
        </div>

        <div class="recipe-detail-content">
          <div class="item-card-header">
            <div>
              <h3>{{ recipe.name }}</h3>

              <p>
                {{ getRecipeVegetarianValue(recipe) ? 'Vegetarian recipe' : 'Non vegetarian recipe' }}
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
              <span>Difficulty</span>
              <strong>{{ recipe.difficulty }}</strong>
            </div>

            <div>
              <span>Servings</span>
              <strong>{{ recipe.servings }}</strong>
            </div>

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

          <div class="card nested-card">
            <h4>Ingredients</h4>

            <p v-if="!recipe.ingredientIds || recipe.ingredientIds.length === 0">
              No ingredients assigned.
            </p>

            <ul v-else>
              <li
                v-for="ingredientId in recipe.ingredientIds"
                :key="ingredientId"
              >
                Ingredient ID: {{ ingredientId }}
              </li>
            </ul>
          </div>

          <div class="actions">
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
              @click="removeRecipe"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>