import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

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
    position: relative;

    &:hover {
        text-decoration: underline;
    }
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownButton = styled.div`
    cursor: pointer;
    font-weight: bold;
    color: white;

    &:hover {
        text-decoration: underline;
    }
`;

const DropdownContent = styled.div`
    position: absolute;
    background-color: #0a0a1f;
    min-width: 200px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1000;
    top: 100%;
    left: 0;
    display: ${(props) => (props.$isOpen ? "block" : "none")}; /* ✅ Solución usando $isOpen */
`;

const DropdownItem = styled(Link)`
    color: white;
    padding: 10px;
    display: block;
    text-decoration: none;
    font-size: 14px;

    &:hover {
        background-color: #1a1a2e;
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
    margin-right: 30px;

    &:hover {
        background-color: darkred;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        console.log("🚪 Cerrando sesión y eliminando token de localStorage");
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <NavbarContainer>
            <h2>Matiz Vision</h2>
            <NavLinks>
                <StyledLink to="/">Dashboard</StyledLink>
                <StyledLink to="/adminlogs">Admin Logs</StyledLink>
                <StyledLink to="/panelsettings">Panel Settings</StyledLink>

                {/* Menú desplegable de Servicios */}
                <Dropdown 
                    onMouseEnter={() => setDropdownOpen(true)} 
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <DropdownButton>Servicios</DropdownButton>
                    <DropdownContent $isOpen={dropdownOpen}>
                        <DropdownItem to="/gestionproductos">Gestionar Productos</DropdownItem>
                        <DropdownItem to="/gestioncitas">Gestionar Citas</DropdownItem>
                        <DropdownItem to="/gestionusuarios">Gestionar Usuarios</DropdownItem>
                    </DropdownContent>
                </Dropdown>

                <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;