import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentForm from './CommentForm';
import RatingForm from './RatingForm';
import jwt_decode from 'jwt-decode';
import './products.css';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState('Carregando...');
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [loggedUserName, setLoggedUserName] = useState('');

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwt_decode(token);
        setLoggedUserName(decoded.name);
      }

      const resProduct = await fetch(`https://artelocal-backend.vercel.app/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productData = await resProduct.json();
      if (resProduct.ok) setProduct(productData);
      else {
        toast.error(productData.message || 'Erro ao carregar produto.');
        return;
      }

      const resComments = await fetch(`https://artelocal-backend.vercel.app/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const commentsData = await resComments.json();
      if (resComments.ok) setComments(commentsData);
      else toast.error('Erro ao carregar comentários.');

      if (productData.artistName) {
        const resRating = await fetch(`https://artelocal-backend.vercel.app/ratings/${productData.artistName}`);
        const ratingData = await resRating.json();
        if (resRating.ok) setAverageRating(ratingData.average);
        else setAverageRating('Sem avaliações');

        const resCheck = await fetch(`https://artelocal-backend.vercel.app/ratings/check/${productData.artistName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const checkData = await resCheck.json();
        if (resCheck.ok) setAlreadyRated(checkData.alreadyRated);
      }
    } catch {
      toast.error('Erro de rede ao carregar detalhes.');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleNewComment = (newComment) => setComments((prev) => [newComment, ...prev]);
  const handleNewRating = () => fetchDetails();

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://artelocal-backend.vercel.app/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Comentário excluído!');
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } else {
        toast.error(data.message || 'Erro ao excluir comentário.');
      }
    } catch {
      toast.error('Erro de rede ao excluir comentário.');
    }
  };

  if (!product) return <p>Carregando detalhes do produto...</p>;

  return (
    <div className="products-container">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> R$ {product.price}</p>
      <p><strong>Contato:</strong> {product.contact}</p>
      <p><strong>Artista:</strong> {product.artistName}</p>
      <p><strong>Email:</strong> {product.artistEmail}</p>
      <p><strong>Nota média do Artesão:</strong> {averageRating} ⭐</p>

      {product.image && (
        <img src={product.image} alt={product.title} className="product-image" />
      )}

      <h3>Comentários:</h3>
      {comments.length === 0 ? (
        <p>Ainda não há comentários.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="comment">
            <p><strong>{c.author}</strong>: {c.content}</p>
            {c.author === loggedUserName && (
              <button onClick={() => handleDeleteComment(c.id)} className="delete-comment-btn">
                Excluir
              </button>
            )}
          </div>
        ))
      )}

      <CommentForm productId={id} onCommentAdded={handleNewComment} />

      {alreadyRated ? (
        <p>⭐ Você já avaliou este artesão.</p>
      ) : (
        <RatingForm artisanName={product.artistName} onRated={handleNewRating} />
      )}

      <Link to="/products" className="back-button">Voltar para Lista</Link>
    </div>
  );
}
