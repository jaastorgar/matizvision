// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeContainer>
      <Title>Bienvenido a Matiz Vision</Title>
      <Description>Tu óptica de confianza, comprometida con tu salud visual y estilo.</Description>

      <Section>
        <SectionTitle>Nuestros Servicios</SectionTitle>
        <p>Ofrecemos una variedad de servicios para mejorar y cuidar tu visión.</p>
        <ul>
          <li>Exámenes de la vista completos</li>
          <li>Asesoría personalizada para elegir tus lentes</li>
          <li>Ajustes y reparaciones de monturas</li>
        </ul>
        <StyledLink to="/servicios">Ver más servicios</StyledLink>
      </Section>

      <Section>
        <SectionTitle>Productos Destacados</SectionTitle>
        <p>Descubre nuestras colecciones de lentes de alta calidad y estilo.</p>
        <ul>
          <li>Lentes de sol con protección UV</li>
          <li>Monturas para lentes de lectura</li>
          <li>Lentes de contacto de diferentes tipos</li>
        </ul>
        <StyledLink to="/productos">Ver todos los productos</StyledLink>
      </Section>

      <Section>
        <SectionTitle>Reserva tu Cita</SectionTitle>
        <p>Agenda fácilmente una cita con nosotros para un examen visual.</p>
        <StyledLink to="/citas">Reservar cita</StyledLink>
      </Section>
    </HomeContainer>
  );
};

// Estilos con Styled Components
const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #333;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  color: #2f4f4f;
`;

const Description = styled.p`
  color: #4d4d4d;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin: 20px 0;
  padding: 15px;
  background-color: #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #006400;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  color: #006400;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default Home;