import { Link, useNavigate } from 'react-router-dom';
import './dashboardClient.css';

export default function DashboardClient() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="client-container">
      <h2>🛒 Área do Cliente</h2>

      <div className="client-card">
        <p>
          Explore a criatividade de artesãos de todo o Brasil! Navegue por diversas obras de arte e
          encontre a peça perfeita para você.
        </p>

        <Link to="/products" className="client-button primary">
          Ver Obras Disponíveis
        </Link>
      </div>

<Link to="/" className="client-button secondary">Voltar ao Início</Link>
<button onClick={handleLogout} className="logout-button">
  Sair
</button>
    </div>
  );
}
