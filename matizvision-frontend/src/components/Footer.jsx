import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 0;
  background-color: #ffffff;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
  margin-top: 50px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #1a1a1a;
    font-size: 20px;
    transition: color 0.3s ease;

    &:hover {
      color: #0a66c2;
    }
  }
`;

const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </SocialIcons>
      <FooterText>&copy; 2025 Matiz Vision. Todos los derechos reservados.</FooterText>
    </FooterContainer>
  );
};

export default Footer;