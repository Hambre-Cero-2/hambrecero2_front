import { getRecipes } from './recipeService'
import { getIngredients } from './ingredientService'

export const getDashboardData = async () => {
  const [recipesResponse, ingredientsResponse] = await Promise.all([
    getRecipes(),
    getIngredients(),
  ])

  return {
    recipes: recipesResponse.data,
    ingredients: ingredientsResponse.data,
  }
}