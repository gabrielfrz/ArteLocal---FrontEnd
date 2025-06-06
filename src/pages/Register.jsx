import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://artelocal-backend.vercel.app/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Usuário registrado com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao registrar.');
      }
    } catch (err) {
      toast.error('Erro ao registrar.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
      <Link to="/" className="back-button">Voltar ao Início</Link>
    </div>
  );
}
