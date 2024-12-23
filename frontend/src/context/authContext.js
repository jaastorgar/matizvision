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
        if (parsedUser && typeof parsedUser === 'object') {
          console.log('Usuario encontrado en localStorage:', parsedUser);
          setUser(parsedUser);
        } else {
          console.error('El usuario almacenado no es válido.');
          localStorage.removeItem('user');
        }
      } else {
        console.log('No se encontró usuario en localStorage.');
      }
    } catch (error) {
      console.error('Error al analizar los datos de localStorage:', error);
      localStorage.removeItem('user'); // Limpia localStorage si hay datos corruptos
    }
  }, []);

  const login = (userData, token) => {
    console.log('Intentando iniciar sesión con:', { userData, token });
    try {
      if (!userData || !token) {
        throw new Error('Los datos de usuario o el token son inválidos.');
      }

      if (userData && typeof userData === 'object' && typeof token === 'string') {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        console.log('Inicio de sesión exitoso. Usuario guardado en localStorage.');
      } else {
        throw new Error('Los datos de usuario o el token no cumplen con el formato esperado.');
      }
    } catch (error) {
      console.error('Error al guardar los datos en localStorage:', error.message);
      localStorage.clear(); // Limpia localStorage en caso de error
    }
  };

  const logout = () => {
    console.log('Cerrando sesión...');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('Sesión cerrada y localStorage limpiado.');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;