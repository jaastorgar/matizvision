import React, { useState } from 'react';
import ManageProducts from './ManageProducts';
import ManageUsers from './ManageUsers';
import RegisterAdmin from './RegisterAdmin';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('products');

  const renderSection = () => {
    switch (activeSection) {
      case 'products':
        return <ManageProducts />;
      case 'users':
        return <ManageUsers />;
      case 'register':
        return <RegisterAdmin />;
      default:
        return <ManageProducts />;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administración</h1>
      <nav style={styles.navbar}>
        <button onClick={() => setActiveSection('products')} style={styles.button}>Gestionar Productos</button>
        <button onClick={() => setActiveSection('users')} style={styles.button}>Gestionar Usuarios</button>
        <button onClick={() => setActiveSection('register')} style={styles.button}>Registrar Administrador</button>
      </nav>
      <div style={styles.content}>{renderSection()}</div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '20px',
  },
};

export default Dashboard;