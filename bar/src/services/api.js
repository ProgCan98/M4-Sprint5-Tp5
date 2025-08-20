import axios from 'axios';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

// Instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 segundos de timeout
});

// Obtener lista de bebidas por búsqueda (e.g., nombre o categoría)
export const getDrinks = async (query = null) => {
  try {
    const url = query
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`; // Ejemplo para todas las bebidas alcohólicas
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return [];
  }
};

// Obtener detalles de una bebida por ID
export const getDrinkById = async (id) => {
  try {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.drinks ? response.data.drinks[0] : null;
  } catch (error) {
    console.error('Error fetching drink by ID:', error);
    throw error;
  }
};

// Obtener categorías de bebidas
export const getCategories = async () => {
  try {
    const response = await api.get('/list.php?c=list');
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export default api;
