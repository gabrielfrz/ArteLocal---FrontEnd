import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RatingForm({ artisanName, onRated }) {
  const [score, setScore] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (score < 1 || score > 5) {
      toast.error('A nota precisa ser de 1 a 5 estrelas.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://artelocal-backend.vercel.app/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ artisanName, score })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Avaliação enviada!');
        if (onRated) onRated();
        setScore(0);
      } else {
        toast.error(data.message || 'Erro ao enviar avaliação.');
      }
    } catch {
      toast.error('Erro de rede.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <label>Avalie o Artesão (1 a 5 estrelas):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        required
      />
      <button type="submit">Enviar Avaliação</button>
    </form>
  );
}
