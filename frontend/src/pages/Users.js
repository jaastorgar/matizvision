import React, { useState, useEffect } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error al cargar los usuarios:', error));
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.lastName} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;