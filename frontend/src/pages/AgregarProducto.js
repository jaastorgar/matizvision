// src/pages/AgregarProducto.js
import React, { useState } from 'react';
import axios from 'axios';

const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert('Producto agregado exitosamente');
      setFormData({ name: '', description: '', price: '', stock: '', image: '' });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <div className="agregar-producto-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre del producto" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
        <input type="text" name="image" placeholder="URL de la imagen" value={formData.image} onChange={handleChange} />
        <button type="submit">Agregar Producto</button>
      </form>

      <style>{`
        .agregar-producto-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 1rem;
          text-align: center;
        }

        form input, form textarea {
          display: block;
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        button {
          background-color: #005500;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #007700;
        }
      `}</style>
    </div>
  );
};

export default AgregarProducto;