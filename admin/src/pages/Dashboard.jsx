import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        borderRadius: '8px',
      }}>
        <h1>Panel de Administración</h1>
      </header>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {/* Sección de estadísticas */}
        <section style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '20px',
        }}>
          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}>
            <h2 style={{ marginBottom: '10px', color: '#333' }}>Usuarios</h2>
            <p style={{
              fontSize: '24px',
              color: '#007BFF',
              fontWeight: 'bold',
            }}>150</p>
          </div>
          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}>
            <h2 style={{ marginBottom: '10px', color: '#333' }}>Citas</h2>
            <p style={{
              fontSize: '24px',
              color: '#007BFF',
              fontWeight: 'bold',
            }}>45 agendadas</p>
          </div>
          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}>
            <h2 style={{ marginBottom: '10px', color: '#333' }}>Productos</h2>
            <p style={{
              fontSize: '24px',
              color: '#007BFF',
              fontWeight: 'bold',
            }}>25 en stock</p>
          </div>
        </section>

        {/* Sección de botones de acción */}
        <section style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '20px',
        }}>
          <Link to="/manage-users" style={{
            display: 'block',
            textAlign: 'center',
            background: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s ease',
          }}
            onMouseEnter={(e) => e.target.style.background = '#0056b3'}
            onMouseLeave={(e) => e.target.style.background = '#007BFF'}>
            Administrar Usuarios
          </Link>
          <Link to="/manage-appointments" style={{
            display: 'block',
            textAlign: 'center',
            background: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s ease',
          }}
            onMouseEnter={(e) => e.target.style.background = '#0056b3'}
            onMouseLeave={(e) => e.target.style.background = '#007BFF'}>
            Ver Citas
          </Link>
          <Link to="/manage-products" style={{
            display: 'block',
            textAlign: 'center',
            background: '#007BFF',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s ease',
          }}
            onMouseEnter={(e) => e.target.style.background = '#0056b3'}
            onMouseLeave={(e) => e.target.style.background = '#007BFF'}>
            Gestionar Productos
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;