import api from './api'

export const getRecipes = () => api.get('/recipes')

export const getRecipeById = (id) => api.get(`/recipes/${id}`)

export const createRecipe = (recipe) => api.post('/recipes', recipe)

export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe)

export const deleteRecipe = (id) => api.delete(`/recipes/${id}`)