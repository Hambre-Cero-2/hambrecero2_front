<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRecipe } from '../../services/recipeService'

const router = useRouter()

const recipe = ref({
  name: '',
  description: '',
})

const saveRecipe = async () => {
  await createRecipe(recipe.value)
  router.push('/recipes')
}
</script>

<template>
  <div class="card">
    <h2>Add Recipe</h2>

    <form @submit.prevent="saveRecipe">
      <input v-model="recipe.name" placeholder="Recipe name" required />
      <input v-model="recipe.description" placeholder="Description" required />

      <button type="submit">Save</button>
    </form>
  </div>
</template>