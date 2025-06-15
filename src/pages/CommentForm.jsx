import { useState } from 'react';
import { toast } from 'react-toastify';
import './commentForm.css';

export default function CommentForm({ productId, onCommentAdded }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('O comentário não pode ser vazio.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://artelocal-backend.vercel.app/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, text })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Comentário enviado!');
        setText('');
        onCommentAdded(data);
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Enviar Comentário</button>
    </form>
  );
}
