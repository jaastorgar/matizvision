import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogs from './pages/AdminLogs';
import PanelSettings from './pages/PanelSettings';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route path="/" element={<ProtectedRoute requiredRole="trabajador"><Dashboard /></ProtectedRoute>} />
                    <Route path="/adminlogs" element={<ProtectedRoute requiredRole="admin"><AdminLogs /></ProtectedRoute>} />
                    <Route path="/panelsettings" element={<ProtectedRoute requiredRole="admin"><PanelSettings /></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;