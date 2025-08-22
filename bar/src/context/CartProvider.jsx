// src/context/CartProvider.jsx
import { useState, useEffect } from 'react';
import CartContext from './CartContext';
import { getOrders, updateOrder, deleteOrder } from '../services/apiBackend';
import { toast } from 'react-toastify';

export function CartProvider({ children }) {
  const savedCartItems = localStorage.getItem('cartItems');
  const savedOrderId = localStorage.getItem('orderId');
  const [cartItems, setCartItems] = useState(
    savedCartItems ? JSON.parse(savedCartItems) : []
  );
  const [orderId, setOrderId] = useState(savedOrderId || null);
  const [isClearing, setIsClearing] = useState(false); // Nuevo estado para forzar actualización

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (orderId && !isClearing) {
      // Evita recargar durante clear
      getOrders()
        .then((orders) => {
          const currentOrder = orders.find((order) => order.id === orderId);
          if (currentOrder) {
            setCartItems(currentOrder.items || []);
          } else {
            setCartItems([]);
            setOrderId(null);
            localStorage.removeItem('orderId');
          }
        })
        .catch((error) => {
          console.error('Error loading orders:', error);
          toast.error('Error al cargar los pedidos');
        });
    }
  }, [cartItems, orderId, isClearing]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      const newItems = existingItem
        ? prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prevItems, { ...item, quantity: 1 }];
      if (orderId) {
        updateOrder(orderId, { items: newItems }).catch((error) =>
          console.error('Error syncing addToCart:', error)
        );
      }
      return newItems;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
    if (orderId) {
      updateOrder(orderId, { items: cartItems }).catch((error) =>
        console.error('Error syncing updateQuantity:', error)
      );
    }
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (orderId && itemToRemove) {
      updateOrder(orderId, { items: cartItems }).catch((error) =>
        console.error('Error syncing removeFromCart:', error)
      );
    }
  };

  const clearCart = () => {
    return new Promise((resolve) => {
      console.log('Clearing cart, current items:', cartItems); // Depuración
      setIsClearing(true); // Evita recarga de useEffect
      setCartItems([]); // Vacía localmente primero
      console.log('After local clear, cartItems:', cartItems); // Depuración
      if (orderId) {
        deleteOrder(orderId)
          .then(() => {
            console.log('Order deleted, resetting orderId:', orderId); // Depuración
            setOrderId(null);
            localStorage.removeItem('orderId');
            resolve();
          })
          .catch((error) => {
            console.error('Error clearing order:', error);
            toast.error('Error al vaciar el carrito, pero se vació localmente');
            setOrderId(null); // Fuerza reset aunque falle
            localStorage.removeItem('orderId');
            resolve();
          });
      } else {
        localStorage.removeItem('orderId');
        resolve();
      }
      setIsClearing(false); // Restaura después de resolver
    });
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
        getCartCount,
        setOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
