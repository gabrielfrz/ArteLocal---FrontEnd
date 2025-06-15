import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './products.css';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://artelocal-backend.vercel.app/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        } else {
          toast.error(data.message || 'Erro ao carregar produtos.');
        }
      } catch (err) {
        toast.error('Erro de rede ao carregar produtos.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Obras Disponíveis</h2>

      {products.length === 0 ? (
        <p>Nenhuma obra cadastrada ainda.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Preço:</strong> R$ {product.price}</p>
              <p><strong>Contato:</strong> {product.contact}</p>
              <p><strong>Artista:</strong> {product.artistName}</p>
              <p><strong>Email do Artista:</strong> {product.artistEmail}</p>

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

      <Link
        to={localStorage.getItem('role') === 'artisan' ? '/dashboard-artisan' : '/dashboard-client'}
        className="back-button"
      >
        Voltar ao Painel
      </Link>
    </div>
  );
}
