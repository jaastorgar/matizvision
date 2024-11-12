// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../assets/Matizvision.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Nav>
      <LogoContainer onClick={() => navigate('/')}>
        <Logo src={LogoImage} alt="Matiz Vision Logo" />
      </LogoContainer>
      <NavLinks>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to="/productos">Productos</StyledLink>
        <StyledLink to="/citas">Citas</StyledLink>
        <StyledLink to="/quienes-somos">Quiénes Somos</StyledLink>
      </NavLinks>

      {isAuthenticated ? (
        <AuthContainer>
          <ProfileButton onClick={() => setShowAuthOptions(!showAuthOptions)}>
            Mi Perfil
          </ProfileButton>
          {showAuthOptions && (
            <AuthOptions>
              <AuthLink to="/perfil">Perfil</AuthLink>
              <AuthLink to="/compras">Mis Compras</AuthLink>
              <AuthLink to="/seguimiento">Seguimiento de Compra</AuthLink>
              <AuthLink to="/citas">Citas Programadas</AuthLink>
              <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
            </AuthOptions>
          )}
        </AuthContainer>
      ) : (
        <StyledLink to="/login">Iniciar Sesión</StyledLink>
      )}
    </Nav>
  );
};

// Estilos con Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #006400;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
`;

const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  background-color: transparent; /* Fondo transparente */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: #00cc66;
  }
`;

const AuthContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #00cc66;
  }
`;

const AuthOptions = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
`;

const AuthLink = styled(Link)`
  color: #006400;
  text-decoration: none;
  padding: 8px 0;
  font-size: 14px;

  &:hover {
    color: #004c33;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #006400;
  cursor: pointer;
  padding: 8px 0;
  font-size: 14px;

  &:hover {
    color: #004c33;
  }
`;

export default Navbar;