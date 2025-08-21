import axios from "axios";

const BASE_URL = 'https://68a73634639c6a54e9a15be8.mockapi.io/api/v1/orders'; // Reemplaza con tu URL real de MockAPI

export const getOrders = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error fetching orders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in GET orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Error creating order');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in POST order:', error);
    throw error;
  }
};

export const updateOrder = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error('Error updating order');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in PUT order:', error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting order');
    return true;
  } catch (error) {
    console.error('Error in DELETE order:', error);
    throw error;
  }
};