import api from './api';

// GET all recipes
export const getRecipes = async () => {
    const { data } = await api.get('/recipes');
    return data;
};

// GET by ID
export const getRecipebyId = async (id) => {
    const { data } = await api.get(`/recipes/${id}`);
    return data;
};

// POST
export const createRecipe = async (payload) => {
    const { data } = await api.post('/recipes', payload);
    return data;
};

// PUT
export const updateRecipe = async (id, payload) => {
    const { data } = await api.put(`/recipes/${id}`, payload);
    return data;
};

// DELETE
export const deleteRecipe = async (id) => {
    await api.delete(`/recipes/${id}`);
};