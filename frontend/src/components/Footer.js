// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <InfoSection>
          <Logo>Matiz Vision</Logo>
          <Description>Especialistas en el cuidado visual para toda la familia.</Description>
        </InfoSection>
        
        <ContactSection>
          <SectionTitle>Contacto</SectionTitle>
          <p>Teléfono: +56 9 8765 4321</p>
          <p>Email: contacto@matizvision.cl</p>
          <p>Dirección: Av. Providencia 1234, Santiago</p>
        </ContactSection>

        <HoursSection>
          <SectionTitle>Horario de Atención</SectionTitle>
          <p>Lunes a Viernes: 10:00 AM - 18:00 PM</p>
          <p>Sábado: 10:00 AM - 14:00 PM</p>
          <p>Domingo: Cerrado</p>
        </HoursSection>

        <SocialSection>
          <SectionTitle>Redes Sociales</SectionTitle>
          <SocialIcons>
            <a href="https://www.facebook.com"><FaFacebook /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
          </SocialIcons>
        </SocialSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 Matiz Vision. Todos los derechos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

// Estilos
const FooterContainer = styled.footer`
  background-color: #333333;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 1px solid #666;
  padding-bottom: 20px;
`;

const InfoSection = styled.div`
  max-width: 200px;
  text-align: left;
`;

const Logo = styled.h2`
  color: #00cc66;
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #dddddd;
`;

const ContactSection = styled.div`
  text-align: left;
`;

const HoursSection = styled.div`
  text-align: left;
`;

const SectionTitle = styled.h3`
  color: #00cc66;
  margin-bottom: 10px;
`;

const SocialSection = styled.div`
  text-align: left;
`;

const SocialIcons = styled.div`
  a {
    color: #00cc66;
    font-size: 24px;
    margin: 0 10px;
    transition: color 0.3s;
    
    &:hover {
      color: #ffffff;
    }
  }
`;

const FooterBottom = styled.div`
  padding-top: 20px;
  font-size: 14px;
`;

export default Footer;