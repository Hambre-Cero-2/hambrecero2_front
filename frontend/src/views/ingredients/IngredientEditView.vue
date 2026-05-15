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

const loading = ref(false)
const saving = ref(false)
const error = ref('')

const loadIngredient = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getIngredientById(route.params.id)
    ingredient.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Could not load ingredient'
  } finally {
    loading.value = false
  }
}

const saveIngredient = async () => {
  saving.value = true
  error.value = ''

  try {
    await updateIngredient(route.params.id, ingredient.value)
    router.push('/ingredients')
  } catch (err) {
    console.error(err)
    error.value = 'Could not update ingredient'
  } finally {
    saving.value = false
  }
}

onMounted(loadIngredient)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Admin
        </span>

        <h2>Edit ingredient</h2>

        <p>
          Update ingredient information.
        </p>
      </div>
    </div>

    <div v-if="loading" class="card">
      Loading ingredient...
    </div>

    <div v-else class="card form-card">
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
            {{ saving ? 'Saving...' : 'Save changes' }}
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