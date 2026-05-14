<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createIngredient } from '../../services/ingredientService'

const router = useRouter()

const ingredient = ref({
  name: '',
  description: '',
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
      <input v-model="ingredient.name" placeholder="Ingredient name" required />
      <input v-model="ingredient.description" placeholder="Description" required />

      <button type="submit">Save</button>
    </form>
  </div>
</template>