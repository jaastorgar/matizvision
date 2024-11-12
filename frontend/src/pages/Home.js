import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaCalendarAlt, FaShoppingBag } from 'react-icons/fa';

const Home = () => {
  return (
    <HomeContainer>
      <Header>
        <HeaderTitle>Bienvenido a Matiz Vision</HeaderTitle>
        <HeaderSubtitle>Cuidamos tu visión y estilo con la mejor tecnología.</HeaderSubtitle>
      </Header>

      <GridContainer>
        <Card>
          <CardIcon><FaEye /></CardIcon>
          <CardTitle>Nuestros Servicios</CardTitle>
          <CardText>
            Ofrecemos exámenes de la vista, asesoría personalizada y más.
          </CardText>
          <CardButton to="/servicios">Descubrir más</CardButton>
        </Card>

        <Card>
          <CardIcon><FaShoppingBag /></CardIcon>
          <CardTitle>Productos Destacados</CardTitle>
          <CardText>
            Explora nuestra selección de lentes y accesorios de alta calidad.
          </CardText>
          <CardButton to="/productos">Ver Productos</CardButton> {/* Enlace hacia la página de productos */}
        </Card>

        <Card>
          <CardIcon><FaCalendarAlt /></CardIcon>
          <CardTitle>Agenda tu Cita</CardTitle>
          <CardText>
            Programa tu cita en línea para una experiencia cómoda y rápida.
          </CardText>
          <CardButton to="/citas">Reservar Cita</CardButton>
        </Card>
      </GridContainer>
    </HomeContainer>
  );
};

// Estilos con Styled Components
const HomeContainer = styled.div`
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Header = styled.header`
  margin-bottom: 40px;
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  color: #006400;
`;

const HeaderSubtitle = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 10px;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 280px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardIcon = styled.div`
  font-size: 40px;
  color: #00cc66;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #006400;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #00cc66;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #009e4d;
  }
`;

export default Home;