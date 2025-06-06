import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Seja bem-vindo ao <span>ArteLocal</span></h1>
      <p>Uma plataforma segura para conectar e transformar realidades através da arte.</p>
      <div className="home-buttons">
        <Link to="/login">Já tem uma conta? Entrar</Link>
        <Link to="/register">Primeira vez aqui? Criar conta</Link>
      </div>
    </div>
  );
}