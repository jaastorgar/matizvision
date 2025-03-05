import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // ✅ Usamos la API centralizada

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log("📩 Intentando iniciar sesión con:", email);

        try {
            const res = await api.post('/auth/login', { email, password });
            console.log("✅ Inicio de sesión exitoso, token recibido:", res.data.token);

            localStorage.setItem("token", res.data.token); // ✅ Guardamos el token
            navigate('/'); // ✅ Redirigir al Dashboard
        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error.response?.data?.message);
            setErrorMessage("Error al iniciar sesión. Inténtalo de nuevo.");
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;