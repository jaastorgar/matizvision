import styled from 'styled-components';

const FooterContainer = styled.footer`
    width: 100%;
    height: 50px;
    background-color: #0a0a1f;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2025 Matiz Vision. Todos los derechos reservados.</p>
        </FooterContainer>
    );
};

export default Footer;