import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleMouseEnter = () => setIsDropdownVisible(true);
  const handleMouseLeave = () => setIsDropdownVisible(false);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setUserEmail(null);
    window.location.href = '/login'; // Redirige al login después de cerrar sesión
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li>
          <Link to="/" style={styles.link}>Inicio</Link>
        </li>
        <li>
          <Link to="/appointments" style={styles.link}>Citas</Link>
        </li>
        <li>
          <Link to="/products" style={styles.link}>Productos</Link>
        </li>
        {!userEmail && (
          <li>
            <Link to="/login" style={styles.link}>Iniciar Sesión</Link>
          </li>
        )}
        {userEmail && (
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={styles.dropdownContainer}
          >
            <span style={styles.link}>Hola, {userEmail}</span>
            {isDropdownVisible && (
              <ul style={styles.dropdown}>
                <li>
                  <Link to="/profile" style={styles.dropdownLink}>Perfil</Link>
                </li>
                <li>
                  <Link to="/purchase-tracking" style={styles.dropdownLink}>Seguimiento de Compras</Link>
                </li>
                <li>
                  <Link to="/purchases" style={styles.dropdownLink}>Compras Realizadas</Link>
                </li>
                <li>
                  <Link to="/client-appointments" style={styles.dropdownLink}>Citas Realizadas</Link>
                </li>
                <li>
                  <span onClick={handleLogout} style={styles.dropdownLink}>Cerrar Sesión</span>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { backgroundColor: '#333', padding: '10px 20px' },
  navList: { listStyle: 'none', display: 'flex', justifyContent: 'space-around', margin: 0, padding: 0 },
  link: { color: '#fff', textDecoration: 'none', fontSize: '16px' },
  dropdownContainer: { position: 'relative', cursor: 'pointer' },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    listStyle: 'none',
    margin: 0,
    padding: '10px 0',
    zIndex: 1000,
  },
  dropdownLink: { display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none', fontSize: '14px' },
};

export default Navbar;