import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Carrito Vacío</h1>
        <Link to="/menu" className="text-orange-500 hover:underline">Volver al Menú</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tu Carrito</h1>
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-2 text-left">Bebida</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Cantidad</th>
            <th className="p-2 text-left">Subtotal</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-700">
              <td className="p-2 flex items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 mr-2 rounded" />
                {item.name}
              </td>
              <td className="p-2">${item.price.toFixed(2)}</td>
              <td className="p-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 p-1 bg-gray-800 text-white border border-gray-600 rounded"
                />
              </td>
              <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="p-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Vaciar Carrito
        </button>
        <p className="text-xl font-bold">Total: ${getTotal()}</p>
      </div>
      <Link
        to="/checkout"
        className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition block text-center"
      >
        Proceder al Pedido
      </Link>
    </div>
  );
}

export default Cart;