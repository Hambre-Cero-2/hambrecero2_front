import api from './api';

export const getIngredients = async () => {
  const response = await api.get("/ingredients");
  return response.data;
};
export const getIngredientById = async (id) => {
  const response = await api.get(`/ingredients/${id}`);
  return response.data;
};



