<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRecipe } from '../../services/recipeService'

const router = useRouter()

const recipe = ref({
  name: '',
  difficult: 'EASY',
  vegetarian: false,
  estimatedCost: 0,
  lastModified: '',
  servings: 1,
  ingredientesID: 1,
  imageName: '',
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
      <input
        v-model="recipe.name"
        placeholder="Recipe name"
        required
      />

      <select v-model="recipe.difficult" required>
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </select>

      <label>
        <input
          v-model="recipe.vegetarian"
          type="checkbox"
        />
        Vegetarian
      </label>

      <input
        v-model.number="recipe.estimatedCost"
        type="number"
        step="0.01"
        placeholder="Estimated cost"
        required
      />

      <input
        v-model="recipe.lastModified"
        type="date"
        required
      />

      <input
        v-model.number="recipe.servings"
        type="number"
        placeholder="Servings"
        required
      />

      <input
        v-model.number="recipe.ingredientesID"
        type="number"
        placeholder="Ingredient ID"
        required
      />

      <input
        v-model="recipe.imageName"
        placeholder="Image name"
      />

      <button type="submit">Save</button>
    </form>
  </div>
</template>