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

const App = () => {
  const location = useLocation();
  const isLoggedIn = false; // Simulación del estado de autenticación

  const showNavbarAndFooter = !['/login', '/register'].includes(location.pathname);

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
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;