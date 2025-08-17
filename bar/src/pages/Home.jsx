import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';

function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white hero-bg"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-md">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Cocktail Bar</h1>
        <p className="text-lg md:text-xl mb-6">Elige tu bebida favorita</p>
        <input
          type="text"
          placeholder="Busca un cóctel..."
          className="p-2 mb-4 w-64 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Explorar Menú
        </Link>
      </div>
    </div>
  );
}

export default Home;
