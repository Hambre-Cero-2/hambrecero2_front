<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createRecipe } from '../../services/recipeService'

const router = useRouter()

const recipe = ref({
  name: '',
  difficulty: 1,
  vegetarian: false,
  estimatedCost: 0,
  lastModified: '',
  servings: 1,
  ingredientIds: [],
  imageName: '',
})

const ingredientId = ref(1)

const saveRecipe = async () => {
  recipe.value.ingredientIds = [ingredientId.value]
  await createRecipe(recipe.value)
  router.push('/recipes')
}
</script>

<template>
  <div class="card">
    <h2>Add Recipe</h2>

    <form @submit.prevent="saveRecipe">
      <input v-model="recipe.name" placeholder="Recipe name" required />

      <input
        v-model.number="recipe.difficulty"
        type="number"
        min="1"
        max="5"
        placeholder="Difficulty 1-5"
        required
      />

      <label>
        <input v-model="recipe.vegetarian" type="checkbox" />
        Vegetarian
      </label>

      <input
        v-model.number="recipe.estimatedCost"
        type="number"
        step="0.01"
        placeholder="Estimated cost"
        required
      />

      <input v-model="recipe.lastModified" type="date" required />

      <input
        v-model.number="recipe.servings"
        type="number"
        min="1"
        placeholder="Servings"
        required
      />

      <input
        v-model.number="ingredientId"
        type="number"
        min="1"
        placeholder="Ingredient ID"
        required
      />

      <input v-model="recipe.imageName" placeholder="Image name" />

      <button type="submit">Save</button>
    </form>
  </div>
</template>