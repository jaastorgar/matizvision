import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      history.push('/login'); // Redirige a la página de login tras registrarse
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="trabajador">Trabajador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;