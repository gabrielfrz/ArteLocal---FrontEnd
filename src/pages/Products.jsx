import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = maxPrice
        ? `https://artelocal-backend.vercel.app/products?maxPrice=${maxPrice}`
        : 'https://artelocal-backend.vercel.app/products';

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        toast.error(data.message || 'Erro ao carregar produtos.');
      }
    } catch (error) {
      toast.error('Erro ao buscar produtos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [maxPrice]);

  return (
    <div className="products-container">
      <h2>🖼️ Obras Disponíveis</h2>

      <input
        type="number"
        placeholder="Filtrar por preço máximo (R$)"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {products.length === 0 && <p>Nenhum produto encontrado.</p>}

      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p><strong>Artista:</strong> {product.artistName}</p>
          <p><strong>Preço:</strong> R$ {product.price}</p>
          <p><strong>Descrição:</strong> {product.description}</p>
          <p><strong>Contato:</strong> {product.contact}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ))}

      <button onClick={() => navigate('/dashboard-client')} className="back-button">
        Voltar ao Dashboard
      </button>
    </div>
  );
}
