import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import heroImage from '../assets/hero1.jpg';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (term) {
      console.log('Redirigiendo a /menu?search=', term);
      navigate(`/menu?search=${encodeURIComponent(term)}`);
    } else {
      console.log('Búsqueda vacía, no se redirige');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white hero-bg"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Cocktail Bar</h1>
        <p className="text-lg md:text-xl mb-6">Elige tu bebida favorita</p>
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca un cóctel..."
              className="p-2 mb-4 w-full rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 mb-4 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition"
            >
              Buscar
            </button>
          </div>
        </form>
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-opacity-80 transition"
        >
          Explorar Menú
        </Link>
      </div>
    </div>
  );
}

export default Home;
