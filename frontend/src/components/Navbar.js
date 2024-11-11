// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Comprueba si el usuario está autenticado
  const [showAuthOptions, setShowAuthOptions] = useState(false); // Estado para mostrar opciones de autenticación

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/'); // Redirige al Home después de cerrar sesión
  };

  return (
    <Nav>
      {/* Secciones Comunes para Todos los Usuarios */}
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #006400;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

// Contenedor de las Opciones de Autenticación
const AuthContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Botón para Mostrar Opciones de Perfil
const ProfileButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

// Contenedor de Opciones Exclusivas de Usuario Autenticado (Cuadro Desplegable)
const AuthOptions = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 8px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
`;

const AuthLink = styled(Link)`
  color: #006400;
  text-decoration: none;
  padding: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #006400;
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    text-decoration: underline;
  }
`;

export default Navbar;