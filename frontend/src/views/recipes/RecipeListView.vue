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
  loadRecipes()
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

      <p>{{ recipe.description }}</p>

      <button @click="removeRecipe(recipe.id)">
        Delete
      </button>
    </div>
  </div>
</template>