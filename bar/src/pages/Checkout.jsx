// src/pages/Checkout.jsx
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/apiBackend';

function Checkout() {
  const { cartItems, clearCart, getTotal, setOrderId } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const table = e.target.table.value;
    const waiter = e.target.waiter.value;
    const time = e.target.time.value;

    const orderData = {
      table: parseInt(table),
      waiter,
      time: parseInt(time),
      items: cartItems,
    };
    console.log('Order data to send:', orderData); // Depuración

    try {
      const response = await createOrder(orderData);
      const orderId = response.id;
      await clearCart();
      setOrderId(null);
      toast.success(
        `Pedido #${orderId} enviado a mesa ${table} con ${waiter} en ${time} min`
      );
      setTimeout(() => navigate('/'), 0);
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);
      toast.error(`Error al enviar el pedido: ${error.message}`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="mb-4">Tu carrito está vacío.</p>
        <Link to="/menu" className="text-orange-500 hover:underline">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Completar Pedido</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Resumen del Carrito</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-gray-700 mt-2 pt-2">
          <p className="text-lg font-bold">Total: ${getTotal()}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Número de Mesa
          </label>
          <input
            type="number"
            name="table"
            min="1"
            required
            className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mozo</label>
          <select
            name="waiter"
            required
            className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="Juan">Juan</option>
            <option value="María">María</option>
            <option value="Pedro">Pedro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Tiempo Aproximado
          </label>
          <select
            name="time"
            required
            className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
          >
            <option value="10">10 min</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
}

export default Checkout;
