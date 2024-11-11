// src/services/authService.js
import axios from 'axios';
import api from '../utils/axios';

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Función para iniciar sesión
export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  // Guarda el token en el localStorage
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Función para obtener el perfil del usuario autenticado
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};