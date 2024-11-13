// src/pages/Productos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="productos-container">
      <h2>Nuestros Productos</h2>
      <p>Explora nuestra selección de productos de alta calidad.</p>
      <div className="productos-grid">
        {products.map((product) => (
          <div key={product.id} className="producto-card">
            <div className="producto-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>
            <p className="product-stock">Disponibles: {product.stock}</p>
            <button className="product-button">Comprar</button>
          </div>
        ))}
      </div>

      {/* CSS inline para el estilo */}
      <style>{`
        .productos-container {
          text-align: center;
          padding: 2rem;
          color: #333;
        }

        .productos-container h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #005500; /* Verde oscuro */
        }

        .productos-container p {
          font-size: 1rem;
          color: #666;
        }

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .producto-card {
          background-color: #ffffff;
          border: 1px solid #ddd;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .producto-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }

        .producto-image img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 1rem;
        }

        .product-description {
          font-size: 0.9rem;
          color: #555;
          margin: 0.5rem 0;
        }

        .product-price {
          font-weight: bold;
          color: #005500;
          margin: 0.5rem 0;
        }

        .product-stock {
          font-size: 0.8rem;
          color: #999;
        }

        .product-button {
          background-color: #005500;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .product-button:hover {
          background-color: #007700;
        }
      `}</style>
    </div>
  );
};

export default Productos;