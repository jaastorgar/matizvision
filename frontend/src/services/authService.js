// services/authService.js
import api from '../utils/axios';

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  // Guarda el token en el localStorage
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};