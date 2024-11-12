// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Productos from './pages/Productos'; // Asegúrate de importar Productos.js
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { isAuthenticated } from './services/authService';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/perfil';

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route path="/productos" element={<Productos />} /> {/* Ruta para Productos */}
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;