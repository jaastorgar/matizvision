import React, { useState } from 'react';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    dv: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', formData);
      alert('Usuario registrado con éxito');
      console.log(response.data);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="rut"
        placeholder="RUT"
        value={formData.rut}
        onChange={handleChange}
      />
      <input
        type="text"
        name="dv"
        placeholder="DV"
        value={formData.dv}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;