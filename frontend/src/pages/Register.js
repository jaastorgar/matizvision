import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    dv: '',
    age: '',
    birthDate: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', formData);
      alert('Usuario registrado con éxito');
      console.log(response.data);
      navigate('/login'); // Redirige al login después del registro
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Registro</h1>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="rut"
          placeholder="RUT"
          value={formData.rut}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="dv"
          placeholder="DV"
          value={formData.dv}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Fecha de nacimiento"
          value={formData.birthDate}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
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
        <button type="submit" style={styles.button}>Registrar</button>
        <div style={styles.links}>
          <p onClick={() => navigate('/login')} style={styles.link}>
            ¿Ya tienes una cuenta? Inicia sesión aquí
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
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#4caf50',
    marginBottom: '25px',
    fontWeight: 'bold',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '12px',
    marginBottom: '20px',
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

export default Register;