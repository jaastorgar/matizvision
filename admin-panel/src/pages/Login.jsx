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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw', // Asegura que ocupe toda la pantalla
            backgroundColor: '#0a0a1f',
            color: '#ffffff',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px',
                borderRadius: '10px',
                backgroundColor: '#1a1a2e',
                boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.1)',
                minWidth: '350px', // Ancho mínimo para evitar que se vea demasiado pequeño
            }}>
                <h2 style={{ marginBottom: '20px' }}>Iniciar Sesión</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleLogin} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '100%', // Asegura que ocupe el ancho del contenedor
                }}>
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                        }}
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            backgroundColor: '#00ffff',
                            color: '#000',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            border: 'none',
                            width: '100%',
                        }}
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;