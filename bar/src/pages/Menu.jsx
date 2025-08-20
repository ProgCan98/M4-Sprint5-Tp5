import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { getDrinks, getCategories } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function Menu() {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('selectedCategory') || '';
  });
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const navigate = useNavigate();

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Error al cargar categorías');
      }
    };
    fetchCategories();
  }, []);

  // Cargar bebidas según categoría o búsqueda
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        let query = '';
        if (selectedCategory && !searchTerm) {
          query = selectedCategory; // Filtro por categoría manual
        } else if (searchTerm) {
          query = searchTerm; // Filtro por búsqueda inicial
        } else {
          query = null; // Todas las bebidas sin filtro
        }
        console.log('Buscando bebidas con query:', query);
        const data = await getDrinks(query);
        if (!data || !data.length) {
          console.warn('No se encontraron bebidas para el query:', query);
          setDrinks([]);
          return;
        }
        const drinksWithPrices = data.map((drink) => ({
          ...drink,
          price: (Math.random() * 15 + 5).toFixed(2),
        }));
        setDrinks(drinksWithPrices);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        toast.error('Error al cargar bebidas');
        setDrinks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
    localStorage.setItem('selectedCategory', selectedCategory);
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (drink) => {
    addToCart({
      id: drink.idDrink,
      name: drink.strDrink,
      price: parseFloat(drink.price),
      image: drink.strDrinkThumb,
    });
  };

  const clearSearch = () => {
    setSearchParams({});
    setSelectedCategory('');
    navigate('/menu'); // Redirige a /menu sin parámetros
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setSearchParams({}); // Limpia el searchTerm de la URL al seleccionar categoría
    }
  };

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (drinks.length === 0 && !loading) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">
          No se encontraron bebidas para "
          {searchTerm || selectedCategory || 'todas'}".
        </p>
        <button
          onClick={clearSearch}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Limpiar Filtros
        </button>
        <br />
        <Link to="/" className="text-orange-500 hover:underline mt-4 block">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menú de Bebidas</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Filtrar por Categoría
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:ring-orange-500"
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drinks.map((drink) => (
          <div
            key={drink.idDrink}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold mb-1">{drink.strDrink}</h2>
            <p className="text-sm mb-1">Categoría: {drink.strCategory}</p>
            <p className="text-sm mb-2">Precio: ${drink.price}</p>
            <Link
              to={`/drink/${drink.idDrink}`}
              className="block text-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition mb-2"
            >
              Ver Detalles
            </Link>
            <button
              onClick={() => handleAddToCart(drink)}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
