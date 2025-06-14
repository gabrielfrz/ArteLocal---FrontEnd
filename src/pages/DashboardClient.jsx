import { Link, useNavigate } from 'react-router-dom';
import './auth.css';  
import './dashboardClient.css';

export default function DashboardClient() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>🛒 Área do Cliente</h2>

      <div className="dashboard-card">
        <p>Explore a criatividade de artesãos de todo o Brasil! Navegue por diversas obras de arte e encontre a peça perfeita para você.</p>

        <Link to="/products" className="dashboard-button">
          Ver Obras Disponíveis
        </Link>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}
