// src/pages/Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Register = () => {
  const [name, setName] = useState('');         // Nombre y Apellido juntos
  const [rut, setRut] = useState('');           // RUT
  const [dv, setDv] = useState('');             // DV
  const [phone, setPhone] = useState('');       // Número de teléfono (9 caracteres)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, rut, dv, phone, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <RegisterContainer>
      <Title>Registro de Cliente</Title>
      <Form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Nombre y Apellido"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="RUT"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          maxLength={8}
          required
        />
        <Input
          type="text"
          placeholder="DV"
          value={dv}
          onChange={(e) => setDv(e.target.value)}
          maxLength={1}
          required
        />
        <Input
          type="tel"
          placeholder="Número de Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={9}
          required
        />
        <Input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Registrarse</Button>
      </Form>
    </RegisterContainer>
  );
};

// Estilos con Styled Components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f2f2f2;
`;

const Title = styled.h2`
  color: #006400;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  color: #fff;
  background-color: #006400;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #004c33;
  }
`;

export default Register;