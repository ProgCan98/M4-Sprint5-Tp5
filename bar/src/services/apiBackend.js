export const getDrinks = async (query) => {
  let url = `${import.meta.env.VITE_COCKTAILDB_BASE_URL}/filter.php?`;
  if (query) {
    url += `c=${encodeURIComponent(query)}`;
  } else {
    url += 'c=Ordinary_Drink'; // Default category
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching drinks');
  const data = await response.json();
  return data.drinks || [];
};

export const getCategories = async () => {
  const url = `${import.meta.env.VITE_COCKTAILDB_BASE_URL}/list.php?c=list`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching categories');
  const data = await response.json();
  return data.drinks ? [] : data.categories || [];
};

export const createOrder = async (orderData) => {
  const url = `${import.meta.env.VITE_MOCKAPI_URL}/orders`;
  console.log('Sending order to:', url, 'with data:', orderData); // Depuración
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const errorText = await response.text(); // Obtener detalles del error
    console.error('Fetch error, status:', response.status, 'text:', errorText);
    throw new Error(`Error creating order: ${response.status} - ${errorText}`);
  }
  return response.json();
};

export const getOrders = async () => {
  const url = `${import.meta.env.VITE_MOCKAPI_URL}/orders`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error fetching orders');
  return response.json();
};

export const updateOrder = async (id, orderData) => {
  const url = `${import.meta.env.VITE_MOCKAPI_URL}/orders/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error('Error updating order');
  return response.json();
};

export const deleteOrder = async (id) => {
  const url = `${import.meta.env.VITE_MOCKAPI_URL}/orders/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting order');
};
