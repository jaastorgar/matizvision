import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

const App = () => {
  const location = useLocation();
  const isLoggedIn = false; // Simulación del estado de autenticación

  // Ocultar Navbar y Footer en rutas de administración
  const showNavbarAndFooter = !location.pathname.startsWith('/admin') && !['/login', '/register'].includes(location.pathname);

  return (
    <div>
      {showNavbarAndFooter && <Navbar isLoggedIn={isLoggedIn} />}
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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;