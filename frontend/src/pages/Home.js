// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeContainer>
      <h1>Bienvenido a Matiz Vision</h1>
      <p>Tu óptica de confianza, comprometida con tu salud visual y estilo.</p>

      <Section>
        <h2>Nuestros Servicios</h2>
        <p>Ofrecemos una variedad de servicios para mejorar y cuidar tu visión.</p>
        <ul>
          <li>Exámenes de la vista completos</li>
          <li>Asesoría personalizada para elegir tus lentes</li>
          <li>Ajustes y reparaciones de monturas</li>
        </ul>
        <Link to="/servicios">Ver más servicios</Link>
      </Section>

      <Section>
        <h2>Productos Destacados</h2>
        <p>Descubre nuestras colecciones de lentes de alta calidad y estilo.</p>
        <ul>
          <li>Lentes de sol con protección UV</li>
          <li>Monturas para lentes de lectura</li>
          <li>Lentes de contacto de diferentes tipos</li>
        </ul>
        <Link to="/productos">Ver todos los productos</Link>
      </Section>

      <Section>
        <h2>Reserva tu Cita</h2>
        <p>Agenda fácilmente una cita con nosotros para un examen visual.</p>
        <Link to="/citas">Reservar cita</Link>
      </Section>
    </HomeContainer>
  );
};

// Estilos con Styled Components
const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
  color: #333;
`;

const Section = styled.section`
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2d72d9; /* Puedes ajustar este color para que coincida con tu esquema */
  }

  p {
    margin: 10px 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 5px 0;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    color: #2d72d9;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Home;