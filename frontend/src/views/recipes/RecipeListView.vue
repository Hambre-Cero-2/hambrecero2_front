<script setup>
import { onMounted, ref } from 'vue'
import { getRecipes, deleteRecipe } from '../../services/recipeService'

const recipes = ref([])

const loadRecipes = async () => {
  const response = await getRecipes()
  recipes.value = response.data
}

const removeRecipe = async (id) => {
  await deleteRecipe(id)
  await loadRecipes()
}

onMounted(loadRecipes)
</script>

<template>
  <div>
    <h2>Recipes</h2>

    <RouterLink class="btn" to="/recipes/new">
      Add Recipe
    </RouterLink>

    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <h3>{{ recipe.name }}</h3>

      <p><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
      <p><strong>Vegetarian:</strong> {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
      <p><strong>Estimated cost:</strong> {{ recipe.estimatedCost }} €</p>
      <p><strong>Last modified:</strong> {{ recipe.lastModified }}</p>
      <p><strong>Servings:</strong> {{ recipe.servings }}</p>

      <button @click="removeRecipe(recipe.id)">
        Delete
      </button>

      <RouterLink class="btn" :to="`/recipes/${recipe.id}/edit`">
        Edit
      </RouterLink>

    </div>
  </div>
</template>