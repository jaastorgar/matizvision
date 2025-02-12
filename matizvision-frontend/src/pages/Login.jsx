import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });

      // Guardar el token en localStorage
      localStorage.setItem("token", response.data.token);

      // Guardar la información del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(response.data.usuario));

      // Actualizar el estado del usuario en el Navbar
      setTimeout(() => {
        navigate("/");
      }, 500); // Espera breve para asegurar que los datos se guarden correctamente

    } catch (error) {
      alert('❌ Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#D3D3D3'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#008000' }}>Iniciar Sesión</h2> 
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