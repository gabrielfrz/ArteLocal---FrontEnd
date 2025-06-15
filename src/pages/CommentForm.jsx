import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CommentForm({ productId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://artelocal-backend.vercel.app/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, content })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Comentário adicionado com sucesso!');
        onCommentAdded(data);
        setContent('');
      } else {
        toast.error(data.message || 'Erro ao adicionar comentário.');
      }
    } catch {
      toast.error('Erro de rede.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="Deixe seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Enviar Comentário</button>
    </form>
  );
}
