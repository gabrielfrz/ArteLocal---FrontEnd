import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RatingForm from './RatingForm';
import CommentForm from './CommentForm';
import './products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState('asc'); // Opções: asc ou desc

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://artelocal-backend.vercel.app/products?order=${order}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        toast.error(data.message || 'Erro ao carregar produtos.');
      }
    } catch {
      toast.error('Erro de rede ao carregar produtos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [order]);

  return (
    <div className="products-container">
      <h2>Obras Disponíveis</h2>

      <div className="filter-container">
        <label>Ordenar por preço:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </select>
      </div>

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
              <p><strong>Email:</strong> {product.artistEmail}</p>
              <p><strong>Nota Média do Artesão:</strong> {product.averageRating} ⭐</p>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              )}

              <h4>Comentários:</h4>
              {product.comments && product.comments.length > 0 ? (
                product.comments.map((c) => (
                  <p key={c.id}>
                    <strong>{c.author}:</strong> {c.content}
                  </p>
                ))
              ) : (
                <p>Ainda sem comentários.</p>
              )}

              <CommentForm
                productId={product.id}
                onCommentAdded={() => fetchProducts()}
              />

              <RatingForm
                artisanName={product.artistName}
                onRated={() => fetchProducts()}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
