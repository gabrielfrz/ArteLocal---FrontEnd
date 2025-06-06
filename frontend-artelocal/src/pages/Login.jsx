import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://artelocal-backend.vercel.app/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success(`Bem-vindo, ${data.name}`);
      } else {
        toast.error(data.error || 'Login inválido');
      }
    } catch (err) {
      toast.error('Erro ao logar.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/" className="back-button">Voltar ao Início</Link>
    </div>
  );
}
