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
const loading = ref(false)
const saving = ref(false)
const error = ref('')

const loadRecipe = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await getRecipeById(route.params.id)
    recipe.value = response.data

    if (recipe.value.ingredients && recipe.value.ingredients.length > 0) {
      ingredientId.value = recipe.value.ingredients[0].id
    }
  } catch (err) {
    console.error(err)
    error.value = 'Could not load recipe'
  } finally {
    loading.value = false
  }
}

const saveRecipe = async () => {
  saving.value = true
  error.value = ''

  try {
    recipe.value.ingredientIds = [ingredientId.value]
    await updateRecipe(route.params.id, recipe.value)
    router.push('/recipes')
  } catch (err) {
    console.error(err)
    error.value = 'Could not update recipe'
  } finally {
    saving.value = false
  }
}

onMounted(loadRecipe)
</script>

<template>
  <section>
    <div class="page-header">
      <div>
        <span class="eyebrow">
          Admin
        </span>

        <h2>Edit recipe</h2>

        <p>
          Update recipe information.
        </p>
      </div>
    </div>

    <div v-if="loading" class="card">
      Loading recipe...
    </div>

    <div v-else class="card form-card">
      <div v-if="error" class="error">
        {{ error }}
      </div>

      <form @submit.prevent="saveRecipe">
        <label>
          Recipe name
          <input
            v-model="recipe.name"
            placeholder="Recipe name"
            required
          />
        </label>

        <label>
          Difficulty
          <input
            v-model.number="recipe.difficulty"
            type="number"
            min="1"
            max="5"
            placeholder="Difficulty 1-5"
            required
          />
        </label>

        <label class="checkbox-row">
          <input
            v-model="recipe.vegetarian"
            type="checkbox"
          />
          Vegetarian
        </label>

        <label>
          Estimated cost
          <input
            v-model.number="recipe.estimatedCost"
            type="number"
            step="0.01"
            placeholder="Estimated cost"
            required
          />
        </label>

        <label>
          Last modified
          <input
            v-model="recipe.lastModified"
            type="date"
            required
          />
        </label>

        <label>
          Servings
          <input
            v-model.number="recipe.servings"
            type="number"
            min="1"
            placeholder="Servings"
            required
          />
        </label>

        <label>
          Ingredient ID
          <input
            v-model.number="ingredientId"
            type="number"
            min="1"
            placeholder="Ingredient ID"
            required
          />
        </label>

        <label>
          Image name
          <input
            v-model="recipe.imageName"
            placeholder="Image name"
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
            @click="router.push('/recipes')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>