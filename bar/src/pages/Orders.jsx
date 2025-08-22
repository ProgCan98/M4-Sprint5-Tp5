// src/pages/Orders.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrder, deleteOrder } from '../services/apiBackend';
import { toast } from 'react-toastify';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateOrder = async (id, updatedData) => {
    try {
      const response = await updateOrder(id, updatedData);
      setOrders(orders.map((order) => (order.id === id ? response : order)));
      toast.success(`Pedido #${id} actualizado`);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error al actualizar el pedido');
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter((order) => order.id !== id));
      toast.success(`Pedido #${id} eliminado`);
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error al eliminar el pedido');
    }
  };

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
        <p className="mb-4">No hay pedidos cargados.</p>
        <Link to="/menu" className="text-orange-500 hover:underline">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4"
        >
          <h2 className="text-lg font-semibold mb-2">Pedido #{order.id}</h2>
          <p>Mesa: {order.table}</p>
          <p>Mozo: {order.waiter}</p>
          <p>Tiempo: {order.time} min</p>
          <h3 className="font-medium mt-2">Items:</h3>
          <ul className="list-disc pl-5">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} (x{item.quantity}) - ${item.price}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <select
              defaultValue={order.waiter}
              onChange={(e) =>
                handleUpdateOrder(order.id, {
                  ...order,
                  waiter: e.target.value,
                })
              }
              className="p-2 bg-gray-900 text-white border border-gray-600 rounded mr-2"
            >
              <option value="Juan">Juan</option>
              <option value="María">María</option>
              <option value="Pedro">Pedro</option>
            </select>
            <select
              defaultValue={order.time}
              onChange={(e) =>
                handleUpdateOrder(order.id, {
                  ...order,
                  time: parseInt(e.target.value),
                })
              }
              className="p-2 bg-gray-900 text-white border border-gray-600 rounded mr-2"
            >
              <option value="10">10 min</option>
              <option value="20">20 min</option>
              <option value="30">30 min</option>
            </select>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      <Link to="/menu" className="text-orange-500 hover:underline mt-4 block">
        Volver al Menú
      </Link>
    </div>
  );
}

export default Orders;
