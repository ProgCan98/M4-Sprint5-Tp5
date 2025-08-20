import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Asegúrate de esta importación

function Navbar() {
  const { getCartCount } = useCart();
  const cartItemsCount = getCartCount();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold">
          Cocktail Bar
        </NavLink>

        {/* Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-orange-500 ${
                isActive ? 'text-orange-500 font-semibold' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `hover:text-orange-500 ${
                isActive ? 'text-orange-500 font-semibold' : ''
              }`
            }
          >
            Menú
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-orange-500 ${
                isActive ? 'text-orange-500 font-semibold' : ''
              }`
            }
          >
            Carrito
            {cartItemsCount > 0 && (
              <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                {cartItemsCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Menú Hamburguesa (Móvil) */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
