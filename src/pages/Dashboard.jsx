import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      navigate('/login');
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Bem-vindo ao ArteLocal!</h2>

      {role === 'artisan' && (
        <div className="dashboard-card">
          <h3>🎨 Painel do Artesão</h3>
          <p>Cadastre suas obras, alcance novos clientes e faça parte da nossa comunidade de artistas em destaque.</p>
          <Link to="/create-product" className="dashboard-button">Anunciar Nova Obra</Link>
        </div>
      )}

      {role === 'client' && (
        <div className="dashboard-card">
          <h3>🛒 Área do Cliente</h3>
          <p>Explore obras de diversos artistas e encontre a peça perfeita para você.</p>
          <Link to="/products" className="dashboard-button">Ver Obras Disponíveis</Link>
        </div>
      )}

      <button
        className="logout-button"
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
      >
        Sair
      </button>
    </div>
  );
}
