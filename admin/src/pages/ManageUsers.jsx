import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('Usuario eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      setError('No se pudo eliminar el usuario');
    }
  };

  const renderUserTable = (title, filteredUsers) => (
    <div style={styles.section}>
      <h2 style={styles.subtitle}>{title}</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button style={styles.buttonEdit} onClick={() => alert('Editar usuario no implementado')}>Editar</button>
                <button style={styles.buttonDelete} onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestión de Usuarios</h1>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <>
          {renderUserTable('Clientes', users.filter(user => user.role === 'cliente'))}
          {renderUserTable('Administradores', users.filter(user => user.role === 'admin'))}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
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
  subtitle: {
    textAlign: 'left',
    color: '#555',
    marginBottom: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  section: {
    marginBottom: '30px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  buttonEdit: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonDelete: {
    padding: '5px 10px',
    backgroundColor: '#FF5733',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ManageUsers;