import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './products.css';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const artistName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://artelocal-backend.vercel.app/products?artistName=${artistName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        } else {
          toast.error(data.message || 'Erro ao carregar seus anúncios.');
        }
      } catch (err) {
        toast.error('Erro de rede ao carregar seus anúncios.');
      }
    };

    fetchProducts();
  }, [artistName]);

  const handleBack = () => {
    navigate('/dashboard-artisan');
  };

  return (
    <div className="products-container">
      <h2>Meus Anúncios</h2>

      {products.length === 0 ? (
        <p>Você ainda não cadastrou nenhuma obra.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Preço:</strong> R$ {product.price}</p>
              <p><strong>Contato:</strong> {product.contact}</p>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleBack} className="back-button">
        Voltar ao Painel
      </button>
    </div>
  );
}
