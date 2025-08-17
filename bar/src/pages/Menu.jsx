import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDrinks, getCategories } from '../services/api';
import { toast } from 'react-toastify';

function Menu() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Mockear precios (TheCocktailDB no los provee)
  const getMockPrice = () => (Math.random() * (20 - 5) + 5).toFixed(2); // Entre $5 y $20

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        toast.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

  // Cargar bebidas (filtradas por categoría o todas)
  useEffect(() => {
    const fetchDrinks = async () => {
      setLoading(true);
      try {
        const data = await getDrinks(selectedCategory);
        // Agregar precio mockeado a cada bebida
        const drinksWithPrice = data.map((drink) => ({
          ...drink,
          price: getMockPrice(),
        }));
        setDrinks(drinksWithPrice);
      } catch {
        toast.error('Error al cargar bebidas');
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Menú de Bebidas
        </h1>

        {/* Filtro de categorías */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 w-full md:w-64 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        {/* Lista de bebidas */}
        {loading ? (
          <p className="text-center">Cargando bebidas...</p>
        ) : drinks.length === 0 ? (
          <p className="text-center">No se encontraron bebidas</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {drinks.map((drink) => (
              <div
                key={drink.idDrink}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {drink.strDrink}
                  </h2>
                  <p className="text-gray-400 mb-2">{drink.strCategory}</p>
                  <p className="text-orange-500 font-bold mb-4">
                    ${drink.price}
                  </p>
                  <Link
                    to={`/drink/${drink.idDrink}`}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
