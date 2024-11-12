// src/pages/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../assets/Matizvision.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response) {
        localStorage.setItem('token', response.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <Logo src={LogoImg} alt="Logo de Matiz Vision" />
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
          <Button type="submit">Ingresar</Button>
        </Form>
        <LinksContainer>
          <StyledLink to="/register">¿No tienes cuenta? Regístrate</StyledLink>
          <StyledLink to="/forgot-password">¿Olvidaste tu contraseña?</StyledLink>
        </LinksContainer>
      </LoginCard>
    </PageContainer>
  );
};

// Estilos con Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7e9, #f2f5f3);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  padding: 50px 40px;
  border-radius: 12px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 25px;
`;

const Title = styled.h2`
  color: #006400;
  margin-bottom: 20px;
  font-size: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 18px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #00cc66;
  }
`;

const Button = styled.button`
  padding: 14px;
  color: #fff;
  background-color: #006400;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004c33;
  }
`;

const LinksContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  color: #006400;
  margin-top: 12px;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login;