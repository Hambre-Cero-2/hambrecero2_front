<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getIngredientById,
  updateIngredient,
} from '../../services/ingredientService'

const route = useRoute()
const router = useRouter()

const ingredient = ref({
  name: '',
  calories: 0,
  season: 'SPRING',
  isOrganic: false,
  harvestDate: '',
  priceKg: 0,
  carbonFootprint: 0,
})

const loadIngredient = async () => {
  const response = await getIngredientById(route.params.id)
  ingredient.value = response.data
}

const saveIngredient = async () => {
  await updateIngredient(route.params.id, ingredient.value)
  router.push('/ingredients')
}

onMounted(loadIngredient)
</script>

<template>
  <div class="card">
    <h2>Edit Ingredient</h2>

    <form @submit.prevent="saveIngredient">
      <input v-model="ingredient.name" placeholder="Name" required />

      <input
        v-model.number="ingredient.calories"
        type="number"
        placeholder="Calories"
        required
      />

      <select v-model="ingredient.season" required>
        <option value="SPRING">Spring</option>
        <option value="SUMMER">Summer</option>
        <option value="AUTUMN">Autumn</option>
        <option value="WINTER">Winter</option>
      </select>

      <label>
        <input v-model="ingredient.isOrganic" type="checkbox" />
        Organic
      </label>

      <input v-model="ingredient.harvestDate" type="date" required />

      <input
        v-model.number="ingredient.priceKg"
        type="number"
        step="0.01"
        placeholder="Price per kg"
        required
      />

      <input
        v-model.number="ingredient.carbonFootprint"
        type="number"
        step="0.01"
        placeholder="Carbon footprint"
        required
      />

      <button type="submit">Save changes</button>
    </form>
  </div>
</template>