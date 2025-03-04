import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.rol !== requiredRole && user.rol !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;