import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      console.log('Verificando usuario en localStorage...');
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Usuario encontrado en localStorage:', parsedUser);
        setUser(parsedUser);
      } else {
        console.log('No se encontró usuario en localStorage.');
      }
    } catch (error) {
      console.error('Error al analizar los datos de localStorage:', error);
    }
  }, []);

  const login = (userData, token) => {
    try {
      if (!userData || !token) {
        throw new Error('Datos de usuario o token no válidos.');
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('email', userData.email); // Guardar el correo
      console.log('Inicio de sesión exitoso.');
    } catch (error) {
      console.error('Error al guardar datos en localStorage:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    console.log('Sesión cerrada.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;