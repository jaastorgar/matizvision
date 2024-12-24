import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const styles = {
  homeContainer: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  banner: {
    background: 'linear-gradient(to right, #4caf50, #8bc34a)',
    color: '#fff',
    textAlign: 'center',
    padding: '50px 20px',
    borderRadius: '8px',
    marginBottom: '40px',
  },
  bannerTitle: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  bannerText: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  ctaButton: {
    backgroundColor: '#fff',
    color: '#4caf50',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  productsSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  productCards: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    flexWrap: 'wrap',
  },
  productCard: {
    background: '#fff',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    width: '30%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '250px',
  },
  productImage: {
    maxWidth: '100%',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  productTitle: {
    fontSize: '1.2rem',
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
  testimonialsSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  testimonials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  testimonial: {
    background: '#fff',
    padding: '15px',
    borderRadius: '8px',
    width: '40%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  testimonialText: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
  },
  testimonialAuthor: {
    fontSize: '0.9rem',
    color: '#999',
  },
  guaranteesSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  guaranteesList: {
    listStyleType: 'none',
    padding: '0',
  },
  guaranteeItem: {
    background: '#fff',
    margin: '10px auto',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    textAlign: 'left',
  },
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar los productos destacados:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAppointmentClick = () => {
    navigate('/appointments');
  };

  return (
    <div style={styles.homeContainer}>
      {/* Encabezado con banner */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Bienvenido a Matiz Vision</h1>
        <p style={styles.bannerText}>Encuentra el lente perfecto para tu estilo.</p>
        <button style={styles.ctaButton} onClick={handleAppointmentClick}>
          Reserva tu cita gratis
        </button>
      </div>

      {/* Sección de productos destacados */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Productos Destacados</h2>
        <div style={styles.productCards}>
          {products.length > 0 ? (
            products.slice(0, 3).map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img
                  src={product.image_url || '/uploads/products/default.jpg'}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3 style={styles.productTitle}>{product.name}</h3>
                <p style={styles.productPrice}>${product.price}</p>
                <button style={styles.productButton}>Ver Detalles</button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No hay productos destacados disponibles.</p>
          )}
        </div>
      </div>

      {/* Sección de testimonios */}
      <div style={styles.testimonialsSection}>
        <h2 style={styles.sectionTitle}>Lo que nuestros clientes dicen</h2>
        <div style={styles.testimonials}>
          <div style={styles.testimonial}>
            <p style={styles.testimonialText}>
              "Los mejores lentes que he comprado. Calidad insuperable."
            </p>
            <span style={styles.testimonialAuthor}>- Cliente Satisfecho</span>
          </div>
          <div style={styles.testimonial}>
            <p style={styles.testimonialText}>
              "La atención fue excelente, ¡recomiendo Matiz Vision al 100%!"
            </p>
            <span style={styles.testimonialAuthor}>- Juan Pérez</span>
          </div>
        </div>
      </div>

      {/* Sección de garantías */}
      <div style={styles.guaranteesSection}>
        <h2 style={styles.sectionTitle}>Nuestras Garantías</h2>
        <ul style={styles.guaranteesList}>
          <li style={styles.guaranteeItem}>
            <strong>Garantía de Satisfacción:</strong> Si no estás completamente satisfecho con tu compra, te devolvemos tu dinero en 30 días.
          </li>
          <li style={styles.guaranteeItem}>
            <strong>Garantía de Calidad:</strong> Todos nuestros productos están fabricados con los más altos estándares de calidad.
          </li>
          <li style={styles.guaranteeItem}>
            <strong>Servicio Postventa:</strong> Reparaciones y ajustes gratuitos durante el primer año.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;