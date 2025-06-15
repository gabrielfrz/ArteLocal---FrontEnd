import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashboardArtisan from './pages/DashboardArtisan';
import DashboardClient from './pages/DashboardClient';
import CreateProduct from './pages/CreateProduct';
import Products from './pages/Products';
import MyProducts from './pages/MyProducts';
import './global.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard-artisan" element={<DashboardArtisan />} />
        <Route path="/dashboard-client" element={<DashboardClient />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </Router>
  );
}
