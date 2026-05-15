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

const saving = ref(false)
const error = ref('')

const saveIngredient = async () => {
  saving.value = true
  error.value = ''

  try {
    await createIngredient(ingredient.value)
    router.push('/ingredients')
  } catch (err) {
    console.error(err)
    error.value = 'Could not save ingredient'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Admin
        </span>

        <h2>Add ingredient</h2>

        <p>
          Create a new sustainable ingredient.
        </p>
      </div>
    </div>

    <div class="card form-card">
      <div v-if="error" class="error">
        {{ error }}
      </div>

      <form @submit.prevent="saveIngredient">
        <label>
          Name
          <input
            v-model="ingredient.name"
            placeholder="Name"
            required
          />
        </label>

        <label>
          Calories
          <input
            v-model.number="ingredient.calories"
            type="number"
            placeholder="Calories"
            required
          />
        </label>

        <label>
          Season
          <select v-model="ingredient.season" required>
            <option value="SPRING">Spring</option>
            <option value="SUMMER">Summer</option>
            <option value="AUTUMN">Autumn</option>
            <option value="WINTER">Winter</option>
          </select>
        </label>

        <label class="checkbox-row">
          <input
            v-model="ingredient.isOrganic"
            type="checkbox"
          />
          Organic
        </label>

        <label>
          Harvest date
          <input
            v-model="ingredient.harvestDate"
            type="date"
            required
          />
        </label>

        <label>
          Price per kg
          <input
            v-model.number="ingredient.priceKg"
            type="number"
            step="0.01"
            placeholder="Price per kg"
            required
          />
        </label>

        <label>
          Carbon footprint
          <input
            v-model.number="ingredient.carbonFootprint"
            type="number"
            step="0.01"
            placeholder="Carbon footprint"
            required
          />
        </label>

        <div class="actions">
          <button
            type="submit"
            class="btn"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save' }}
          </button>

          <button
            type="button"
            class="btn btn-outline"
            @click="router.push('/ingredients')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>