import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/api'; // ✅ Usamos la API centralizada

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("⚠ No hay token, redirigiendo a /login");
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await api.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("✅ Usuario autenticado en ProtectedRoute:", res.data);

                // 🔹 Solo permitir acceso si el usuario es admin o trabajador
                if (res.data.rol === "admin" || res.data.rol === "trabajador") {
                    setUser(res.data);
                } else {
                    console.warn("⛔ Usuario sin permisos, redirigiendo a /login");
                    setUser(null);
                }
            } catch (error) {
                console.error("❌ Error al verificar autenticación:", error);
                setUser(null);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <p>Cargando...</p>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;