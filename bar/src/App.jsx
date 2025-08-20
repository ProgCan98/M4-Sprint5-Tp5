import { Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Outlet />
    </CartProvider>
  );
}

export default App;