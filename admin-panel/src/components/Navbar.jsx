import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    width: 100vw;
    height: 60px;
    background-color: #0a0a1f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const LogoutButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 12px 25px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 16px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    margin-right: 30px; /* ✅ Separado del borde */

    &:hover {
        background-color: darkred;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("🚪 Cerrando sesión y eliminando token de localStorage");
        localStorage.removeItem('token'); // ✅ Eliminamos el token
        navigate('/login'); // ✅ Redirigir al login
    };

    return (
        <NavbarContainer>
            <h2>Matiz Vision</h2>
            <NavLinks>
                <StyledLink to="/">Dashboard</StyledLink>
                <StyledLink to="/adminlogs">Admin Logs</StyledLink>
                <StyledLink to="/panelsettings">Panel Settings</StyledLink>
                <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;