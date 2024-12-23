import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Intentando enviar los datos de inicio de sesión:', formData);
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Respuesta completa del servidor:', response.data);

      const { user, token } = response.data;

      // Validar si existen `user` y `token`
      if (!user) {
        throw new Error('El objeto "user" no existe en la respuesta del servidor.');
      }
      if (!token) {
        throw new Error('El token no existe en la respuesta del servidor.');
      }

      login(user, token); // Pasar datos válidos al contexto
      alert('Inicio de sesión exitoso');
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      alert(error.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.');
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
};

export default Login;