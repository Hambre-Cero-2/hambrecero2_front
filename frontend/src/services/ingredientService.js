import api from './api'

export const getIngredients = () => api.get('/ingredients')

export const getIngredientById = (id) => api.get(`/ingredients/${id}`)

export const createIngredient = (ingredient) => api.post('/ingredients', ingredient)

export const updateIngredient = (id, ingredient) => api.put(`/ingredients/${id}`, ingredient)

export const deleteIngredient = (id) => api.delete(`/ingredients/${id}`)