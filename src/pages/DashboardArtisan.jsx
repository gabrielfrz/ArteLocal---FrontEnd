import { Link, useNavigate } from 'react-router-dom';
import './dashboardArtisan.css';

export default function DashboardArtisan() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="artisan-container">
      <h2>🎨 Painel do Artesão</h2>

      <div className="artisan-card">
        <p>
          Bem-vindo ao seu espaço criativo! Aqui você pode divulgar suas obras, alcançar
          novos clientes e fazer parte da nossa comunidade de artistas em destaque.
        </p>

        <div className="button-group">
          <Link to="/create-product" className="artisan-button primary">
            Anunciar Nova Obra
          </Link>

          <Link to="/my-products" className="artisan-button secondary">
            Ver Meus Anúncios
          </Link>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}
