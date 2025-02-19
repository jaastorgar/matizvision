import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar el mensaje de error al intentar iniciar sesión

    try {
        const response = await api.post('/auth/login', { email, password });

        if (!response.data.token || !response.data.usuario) {
            setErrorMessage("❌ Ocurrió un error inesperado. Intente nuevamente.");
            return;
        }

        // Guardar el token y la información del usuario
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.usuario));

        // Notificar al Navbar que el usuario ha cambiado
        window.dispatchEvent(new Event("storage"));

        // Redirigir a la página de inicio
        setTimeout(() => {
            navigate("/");
        }, 500);

    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                setErrorMessage("❌ El usuario no está registrado.");
            } else if (error.response.status === 400) {
                setErrorMessage("❌ Contraseña incorrecta. Verifica tus credenciales.");
            } else {
                setErrorMessage("❌ Error al iniciar sesión. Intente nuevamente.");
            }
        } else {
            setErrorMessage("❌ Error de conexión. Intente más tarde.");
        }
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F3F4F6'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '350px'
      }}>
        <h2 style={{ color: '#008000' }}>Iniciar Sesión</h2> 
        
        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div style={{
            backgroundColor: '#ffdddd',
            color: '#d8000c',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
            fontSize: '14px',
            border: '1px solid #d8000c'
          }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #008000' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #008000' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#008000',
              color: '#ffffff',
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Ingresar
          </button>
        </form>
        
        <div style={{ marginTop: '15px' }}>
          <Link to="/forgot-password" style={{ color: '#008000', textDecoration: 'none', marginRight: '10px' }}>
            ¿Olvidaste tu contraseña?
          </Link>
          <span>|</span>
          <Link to="/register" style={{ color: '#008000', textDecoration: 'none', marginLeft: '10px' }}>
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;