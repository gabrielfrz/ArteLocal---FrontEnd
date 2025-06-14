import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './createProduct.css';

export default function CreateProduct() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    contact: '',
    artistName: localStorage.getItem('userName') || ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://artelocal-backend.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Produto anunciado com sucesso!');
        navigate('/dashboard-artisan');
      } else {
        toast.error(data.message || 'Erro ao anunciar o produto.');
      }
    } catch (error) {
      toast.error('Erro ao anunciar o produto.');
    }
  };

  return (
    <div className="create-product-container">
      <h2>Anunciar Nova Obra</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Título da Obra" onChange={handleChange} required />
        <textarea name="description" placeholder="Descrição" onChange={handleChange} required rows="4" />
        <input name="price" placeholder="Preço (Ex: 300.00)" onChange={handleChange} required />
        <input name="image" placeholder="URL da Imagem" onChange={handleChange} required />
        <input name="contact" placeholder="Informações de Contato" onChange={handleChange} required />

        <button type="submit">Anunciar</button>
      </form>

      <button onClick={() => navigate('/dashboard-artisan')} className="back-button">
        Voltar ao Painel
      </button>
    </div>
  );
}
