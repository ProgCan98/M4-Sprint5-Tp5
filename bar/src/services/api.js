import axios from 'axios';

// Instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_COCKTAILDB_BASE_URL,
  timeout: 5000, // 5 segundos de timeout
});

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

export default api;
