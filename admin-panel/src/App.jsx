import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogs from './pages/AdminLogs';
import PanelSettings from './pages/PanelSettings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GestionCitas from './pages/GestionCitas';
import GestionProductos from './pages/GestionProductos';
import GestionUsuarios from './pages/GestionUsuarios';
import UsuarioDetalle from './pages/UsuarioDetalle';

const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login"; // ✅ Detectar si estamos en login

    return (
        <>
            {!isLoginPage && <Navbar />} {/* ✅ Mostrar Navbar si NO es login */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/adminlogs" element={<ProtectedRoute><AdminLogs /></ProtectedRoute>} />
                <Route path="/panelsettings" element={<ProtectedRoute><PanelSettings /></ProtectedRoute>} />
                <Route path="/gestioncitas" element={<ProtectedRoute><GestionCitas /></ProtectedRoute>} />
                <Route path="/gestionproductos" element={<ProtectedRoute><GestionProductos /></ProtectedRoute>} />
                <Route path="/gestionusuarios" element={<ProtectedRoute><GestionUsuarios /></ProtectedRoute>} />
                <Route path="/usuarios/:id" element={<ProtectedRoute><UsuarioDetalle /></ProtectedRoute>} />
            </Routes>
            {!isLoginPage && <Footer />} {/* ✅ Mostrar Footer si NO es login */}
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};

export default App;