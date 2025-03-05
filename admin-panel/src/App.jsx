import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogs from './pages/AdminLogs';
import PanelSettings from './pages/PanelSettings';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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