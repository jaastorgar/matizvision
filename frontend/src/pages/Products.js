import React, { useState, useEffect } from 'react';
import api from '../api';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4caf50',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  productCard: {
    background: '#fff',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    maxWidth: '100%',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '1rem',
    color: '#4caf50',
    marginBottom: '15px',
  },
  productButton: {
    background: '#4caf50',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  productButtonHover: {
    background: '#3e8e41',
  },
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    api
      .get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nuestro Marketplace</h1>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productCard}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img
              src={product.photo || '/uploads/products/default.jpg'}
              alt={product.name}
              style={styles.productImage}
            />
            <h2 style={styles.productName}>{product.name}</h2>
            <p style={styles.productPrice}>${product.price}</p>
            <button
              style={{
                ...styles.productButton,
                ...(hoveredProduct === product.id && styles.productButtonHover),
              }}
            >
              Comprar Ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;