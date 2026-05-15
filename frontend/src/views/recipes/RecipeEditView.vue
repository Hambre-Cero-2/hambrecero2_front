<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipeById, updateRecipe } from '../../services/recipeService'

const route = useRoute()
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

const loadRecipe = async () => {
  const response = await getRecipeById(route.params.id)
  recipe.value = response.data

  if (recipe.value.ingredients && recipe.value.ingredients.length > 0) {
    ingredientId.value = recipe.value.ingredients[0].id
  }
}

const saveRecipe = async () => {
  recipe.value.ingredientIds = [ingredientId.value]
  await updateRecipe(route.params.id, recipe.value)
  router.push('/recipes')
}

onMounted(loadRecipe)
</script>

<template>
  <div class="card">
    <h2>Edit Recipe</h2>

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

      <button type="submit">Save changes</button>
    </form>
  </div>
</template>