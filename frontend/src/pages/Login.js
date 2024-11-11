// src/pages/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response) {
        localStorage.setItem('token', response.token); // Guarda el token en localStorage para autenticación
        navigate('/'); // Redirige al Home después de iniciar sesión
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <LoginContainer>
      <Title>Iniciar Sesión</Title>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Correo electrónico"
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
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      <LinksContainer>
        <StyledLink to="/register">¿No tienes cuenta? Regístrate</StyledLink>
        <StyledLink to="/forgot-password">¿Olvidaste tu contraseña?</StyledLink>
      </LinksContainer>
    </LoginContainer>
  );
};

// Estilos con Styled Components
const LoginContainer = styled.div`
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

const LinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #006400;
  margin-top: 10px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;