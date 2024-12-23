import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { AuthContext } from './context/authContext';



const App = () => {
  const { user } = useContext(AuthContext);

  const excludeNavbarFooterRoutes = ['/login', '/register'];
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
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

export default App;