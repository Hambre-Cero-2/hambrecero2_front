<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteIngredient, getIngredientById } from '../../services/ingredientService'
import { getUserRole } from '../../services/authService'

const route = useRoute()
const router = useRouter()

const ingredient = ref(null)
const loading = ref(false)
const error = ref('')

const isAdmin = computed(() => getUserRole() === 'ADMIN')

const getIngredientOrganicValue = (ingredientValue) => {
  return ingredientValue?.organic ?? ingredientValue?.isOrganic ?? false
}

const getIngredientPriceValue = (ingredientValue) => {
  return Number(ingredientValue?.priceKg ?? ingredientValue?.price_kg ?? 0)
}

const getIngredientCarbonFootprintValue = (ingredientValue) => {
  return Number(ingredientValue?.carbonFootprint ?? ingredientValue?.carbon_footprint ?? 0)
}

const getIngredientHarvestDateValue = (ingredientValue) => {
  return ingredientValue?.harvestDate ?? ingredientValue?.harvest_date ?? ''
}

const loadIngredient = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getIngredientById(route.params.id)
    ingredient.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Could not load ingredient detail'
  } finally {
    loading.value = false
  }
}

const removeIngredient = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this ingredient?')

  if (!confirmed) {
    return
  }

  try {
    await deleteIngredient(route.params.id)
    router.push('/ingredients')
  } catch (err) {
    console.error(err)
    error.value = 'Could not delete ingredient'
  }
}

onMounted(loadIngredient)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Ingredient detail
        </span>

        <h2>{{ ingredient?.name || 'Ingredient' }}</h2>

        <p>
          Full information about this ingredient.
        </p>
      </div>

      <RouterLink
        class="btn btn-outline"
        to="/ingredients"
      >
        Back to ingredients
      </RouterLink>
    </div>

    <div v-if="loading" class="card">
      Loading ingredient...
    </div>

    <div v-else-if="error" class="card error">
      {{ error }}
    </div>

    <div v-else-if="!ingredient" class="card empty-state">
      Ingredient not found.
    </div>

    <article v-else class="card ingredient-detail-card">
      <div class="item-card-header">
        <div>
          <h3>{{ ingredient.name }}</h3>

          <p>
            {{ getIngredientOrganicValue(ingredient) ? 'Organic ingredient' : 'Non organic ingredient' }}
          </p>
        </div>

        <span
          class="badge"
          :class="{ 'badge-success': getIngredientOrganicValue(ingredient) }"
        >
          {{ getIngredientOrganicValue(ingredient) ? 'Organic' : 'Non organic' }}
        </span>
      </div>

      <div class="details-grid ingredient-detail-grid">
        <div>
          <span>Season</span>
          <strong>{{ ingredient.season || '-' }}</strong>
        </div>

        <div>
          <span>Calories</span>
          <strong>{{ ingredient.calories }}</strong>
        </div>

        <div>
          <span>Price/kg</span>
          <strong>{{ getIngredientPriceValue(ingredient).toFixed(2) }} €</strong>
        </div>

        <div>
          <span>Carbon footprint</span>
          <strong>{{ getIngredientCarbonFootprintValue(ingredient).toFixed(2) }} kg CO₂</strong>
        </div>

        <div>
          <span>Harvest date</span>
          <strong>{{ getIngredientHarvestDateValue(ingredient) || '-' }}</strong>
        </div>

        <div>
          <span>Type</span>
          <strong>{{ getIngredientOrganicValue(ingredient) ? 'Organic' : 'Non organic' }}</strong>
        </div>
      </div>

      <div class="actions">
        <RouterLink
          v-if="isAdmin"
          class="btn"
          :to="`/ingredients/${ingredient.id}/edit`"
        >
          Edit
        </RouterLink>

        <button
          v-if="isAdmin"
          type="button"
          class="btn btn-danger"
          @click="removeIngredient"
        >
          Delete
        </button>
      </div>
    </article>
  </section>
</template>