import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

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

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);  // <- Agora confere exatamente o nome do backend
        localStorage.setItem('userName', data.name);

        toast.success(`Bem-vindo, ${data.name}`);

        if (data.role === 'artisan') {
          navigate('/dashboard-artisan');
        } else if (data.role === 'client') {
          navigate('/dashboard-client');
        } else {
          toast.error('Perfil de usuário inválido');
        }
      } else {
        toast.error(data.message || 'Login inválido');
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
