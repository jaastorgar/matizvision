import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      alert('Inicio de sesión exitoso');
      console.log(response.data);
      navigate('/'); // Redirige al inicio después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Ingresar</button>
        <div style={styles.links}>
          <p onClick={() => navigate('/register')} style={styles.link}>
            ¿No tienes cuenta? Regístrate aquí
          </p>
          <p onClick={() => navigate('/forgot-password')} style={styles.link}>
            Olvidé mi contraseña
          </p>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    width: '400px',
    padding: '40px', // Incrementar el padding para más espacio interno
    backgroundColor: '#fff',
    borderRadius: '10px', // Bordes más redondeados
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#4caf50',
    marginBottom: '25px',
    fontWeight: 'bold',
  },
  input: {
    width: 'calc(100% - 20px)', // Asegura espacio horizontal dentro del formulario
    padding: '12px',
    marginBottom: '20px', // Más separación entre campos
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  links: {
    marginTop: '20px',
    textAlign: 'center',
  },
  link: {
    color: '#4caf50',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '0.9rem',
  },
};

export default Login;