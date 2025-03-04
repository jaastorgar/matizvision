import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
    width: 250px;
    height: 100vh;
    background-color: #0a0a1f;
    color: white;
    padding: 20px;
    position: fixed;
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/adminlogs">Admin Logs</Link></li>
                <li><Link to="/panelsettings">Panel Settings</Link></li>
            </ul>
        </SidebarContainer>
    );
};

export default Sidebar;