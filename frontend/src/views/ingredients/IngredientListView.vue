<script setup>
import { onMounted, ref } from 'vue'
import {
  getIngredients,
  deleteIngredient,
} from '../../services/ingredientService'

const ingredients = ref([])

const loadIngredients = async () => {
  const response = await getIngredients()
  ingredients.value = response.data
}

const removeIngredient = async (id) => {
  await deleteIngredient(id)
  await loadIngredients()
}

onMounted(loadIngredients)
</script>

<template>
  <div>
    <h2>Ingredients</h2>

    <RouterLink class="btn" to="/ingredients/new">
      Add Ingredient
    </RouterLink>

    <div
      class="card"
      v-for="ingredient in ingredients"
      :key="ingredient.id"
    >
      <h3>{{ ingredient.name }}</h3>

      <p><strong>Calories:</strong> {{ ingredient.calories }}</p>
      <p><strong>Season:</strong> {{ ingredient.season }}</p>
      <p><strong>Organic:</strong> {{ ingredient.isOrganic ? 'Yes' : 'No' }}</p>
      <p><strong>Harvest date:</strong> {{ ingredient.harvestDate }}</p>
      <p><strong>Price/kg:</strong> {{ ingredient.priceKg }} €</p>
      <p><strong>Carbon footprint:</strong> {{ ingredient.carbonFootPrint }}</p>

      <button @click="removeIngredient(ingredient.id)">
        Delete
      </button>
    </div>
  </div>
</template>