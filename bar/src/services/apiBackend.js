import axios from 'axios';

// Instancia de axios para CocktailDB
const cocktailApi = axios.create({
  baseURL: import.meta.env.VITE_COCKTAILDB_BASE_URL,
  timeout: 5000,
});

// Instancia de axios para MockAPI
const mockApi = axios.create({
  baseURL: import.meta.env.VITE_MOCKAPI_URL,
  timeout: 5000,
});

export const getDrinks = async (query) => {
  try {
    let url = '/filter.php?';
    if (query) {
      url += `c=${encodeURIComponent(query)}`;
    } else {
      url += 'c=Ordinary_Drink'; // Default category
    }

    const response = await cocktailApi.get(url);
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching drinks:', error);
    throw new Error('Error fetching drinks');
  }
};

export const getCategories = async () => {
  try {
    const response = await cocktailApi.get('/list.php?c=list');
    return response.data.drinks ? [] : response.data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};

export const getDrinkById = async (id) => {
  try {
    const response = await cocktailApi.get(`/lookup.php?i=${id}`);
    return response.data.drinks ? response.data.drinks[0] : null;
  } catch (error) {
    console.error('Error fetching drink by ID:', error);
    throw new Error('Error fetching drink by ID');
  }
};

export const createOrder = async (orderData) => {
  try {
    console.log(
      'Sending order to:',
      `${import.meta.env.VITE_MOCKAPI_URL}/orders`,
      'with data:',
      orderData
    ); // Depuración
    const response = await mockApi.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error(
      'Fetch error, status:',
      error.response?.status,
      'data:',
      error.response?.data
    );
    throw new Error(
      `Error creating order: ${error.response?.status || 'unknown'} - ${
        error.response?.data || error.message
      }`
    );
  }
};

export const getOrders = async () => {
  try {
    const response = await mockApi.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error fetching orders');
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await mockApi.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Error updating order');
  }
};

export const deleteOrder = async (id) => {
  try {
    await mockApi.delete(`/orders/${id}`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Error deleting order');
  }
};
