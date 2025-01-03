import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Solución para navigate
import api from '../services/api'; // Solución para api
import AuthContext from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Define navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Intentando enviar los datos de inicio de sesión:', formData);
      const response = await api.post('/auth/login', formData);
      console.log('Respuesta completa del servidor:', response.data);

      const { user, token } = response.data;

      if (!user || !token) {
        throw new Error('La respuesta del servidor no contiene los datos esperados.');
      }

      login(user, token); // Guarda el usuario y el token en el contexto de autenticación
      alert('Inicio de sesión exitoso');
      navigate('/dashboard'); // Redirige al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert(error.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Iniciar Sesión
        </button>
      </form>
      <div style={styles.linksContainer}>
        <a href="/forgot-password" style={styles.link}>
          He olvidado la clave
        </a>
        <a href="/register" style={styles.link}>
          Regístrate aquí
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '95%',
    padding: '10px',
    margin: '12px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    width: '95%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  linksContainer: {
    marginTop: '15px',
    textAlign: 'center',
  },
  link: {
    display: 'block',
    margin: '5px 0',
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default Login;