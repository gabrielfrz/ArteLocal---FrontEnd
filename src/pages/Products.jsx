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
              {/* Se futuramente quiser exibir a imagem real via URL, use esse trecho abaixo */}
              {/* <img src={`https://artelocal-backend.vercel.app/uploads/${product.image}`} alt={product.title} className="product-image" /> */}

              {/* Como agora é só o nome da imagem como string, vamos exibir assim: */}
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Preço:</strong> R$ {product.price}</p>
              <p><strong>Contato:</strong> {product.contact}</p>
              <p><strong>Imagem:</strong> {product.image}</p>
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
