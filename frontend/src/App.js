import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Products from './pages/Products';
import Appointments from './pages/Appointments';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  </Router>
);

export default App;