import { Link, useNavigate } from 'react-router-dom';
import './auth.css';  
import './dashboardArtisan.css';

export default function DashboardArtisan() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>🎨 Painel do Artesão</h2>

      <div className="dashboard-card">
        <p>Bem-vindo ao seu espaço criativo! Aqui você pode divulgar suas obras e alcançar centenas de novos clientes.</p>

        <Link to="/create-product" className="dashboard-button">
          Anunciar Nova Obra
        </Link>

        <Link to="/products" className="dashboard-button" style={{ marginTop: '1rem' }}>
          Ver Meus Anúncios
        </Link>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}
