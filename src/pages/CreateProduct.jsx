import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './createProduct.css';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    contact: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://artelocal-backend.vercel.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Produto anunciado com sucesso!');
        navigate('/dashboard-artisan');
      } else {
        toast.error(data.message || 'Erro ao anunciar produto.');
      }
    } catch (err) {
      toast.error('Erro de rede ao anunciar produto.');
    }
  };

  return (
    <div className="create-product-container">
      <h2>Anunciar Nova Obra</h2>

      <form onSubmit={handleSubmit} className="create-product-form">
        <input
          type="text"
          name="title"
          placeholder="Título da Obra"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Preço (Ex: 300.00)"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Informações de Contato"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="URL da Imagem (ex: https://...)"
          value={form.image}
          onChange={handleChange}
          required
        />

        {form.image && form.image.startsWith('http') && (
          <div className="image-preview">
            <p>Pré-visualização da Imagem:</p>
            <img src={form.image} alt="Preview" />
          </div>
        )}

        <button type="submit">Anunciar</button>
      </form>

      <Link to="/dashboard-artisan" className="back-button">
        Voltar ao Painel
      </Link>
    </div>
  );
}
