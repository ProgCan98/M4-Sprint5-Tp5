import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar bebida al carrito
  const addToCart = (drink) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === drink.id);
      if (existingItem) {
        // Actualizar cantidad si ya existe
        return prevItems.map((item) =>
          item.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Agregar nuevo con cantidad 1
      toast.success('Bebida agregada al carrito');
      return [...prevItems, { ...drink, quantity: 1 }];
    });
  };

  // Actualizar cantidad
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(id);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Eliminar item
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.info('Bebida eliminada del carrito');
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrito vaciado');
  };

  // Calcular total
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Cantidad total de items para badge
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);