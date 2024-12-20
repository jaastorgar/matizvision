import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import Products from './pages/Products';
import Profile from './pages/Profile';
import PurchaseTracking from './pages/PurchaseTracking';
import Purchases from './pages/Purchases';
import ClientAppointments from './pages/ClientAppointments';
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminProducts from "./pages/AdminPanel/AdminProducts";
import AdminAppointments from "./pages/AdminPanel/AdminAppointments";
import AdminUsers from "./pages/AdminPanel/AdminUsers";
import AdminLogin from './pages/AdminPanel/AdminLogin';
import { AuthContext } from './context/authContext';

const ProtectedRoute = ({ element: Element }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  if (user.role !== 'admin') {
    return <div>No tienes permiso para acceder a esta sección</div>;
  }

  return <Element />;
};

const App = () => {
  const { user } = useContext(AuthContext);

  const excludeNavbarFooterRoutes = ['/login', '/register', '/admin'];
  const pathname = window.location.pathname;
  const showNavbarAndFooter = !excludeNavbarFooterRoutes.some(route => pathname.startsWith(route));

  return (
    <div>
      {showNavbarAndFooter && <Navbar isLoggedIn={!!user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchase-tracking" element={<PurchaseTracking />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/client-appointments" element={<ClientAppointments />} />
        <Route path="/admin" element={<ProtectedRoute element={AdminPanel} />} />
        <Route path="/admin/products" element={<ProtectedRoute element={AdminProducts} />} />
        <Route path="/admin/appointments" element={<ProtectedRoute element={AdminAppointments} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={AdminUsers} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;