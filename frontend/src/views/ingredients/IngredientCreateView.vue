<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createIngredient } from '../../services/ingredientService'

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

const saveIngredient = async () => {
  await createIngredient(ingredient.value)
  router.push('/ingredients')
}
</script>

<template>
  <div class="card">
    <h2>Add Ingredient</h2>

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

      <input
        v-model="ingredient.harvestDate"
        type="date"
        required
      />

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

      <button type="submit">Save</button>
    </form>
  </div>
</template>