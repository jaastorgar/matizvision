import React from 'react';

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
  },
  productCard: {
    background: '#fff',
    border: '1px solid #dcdcdc',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    width: '30%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
};

const Home = () => {
  return (
    <div style={styles.homeContainer}>
      {/* Encabezado con banner */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Bienvenido a Matiz Vision</h1>
        <p style={styles.bannerText}>Encuentra el lente perfecto para tu estilo.</p>
        <button style={styles.ctaButton}>Reserva tu cita gratis</button>
      </div>

      {/* Sección de productos destacados */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Productos Destacados</h2>
        <div style={styles.productCards}>
          <div style={styles.productCard}>
            <img src="/uploads/products/sample1.jpg" alt="Producto 1" style={styles.productImage} />
            <h3 style={styles.productTitle}>Modelo Elegante</h3>
            <p style={styles.productPrice}>$49.990</p>
            <button style={styles.productButton}>Ver Detalles</button>
          </div>
          <div style={styles.productCard}>
            <img src="/uploads/products/sample2.jpg" alt="Producto 2" style={styles.productImage} />
            <h3 style={styles.productTitle}>Modelo Clásico</h3>
            <p style={styles.productPrice}>$39.990</p>
            <button style={styles.productButton}>Ver Detalles</button>
          </div>
          <div style={styles.productCard}>
            <img src="/uploads/products/sample3.jpg" alt="Producto 3" style={styles.productImage} />
            <h3 style={styles.productTitle}>Modelo Moderno</h3>
            <p style={styles.productPrice}>$59.990</p>
            <button style={styles.productButton}>Ver Detalles</button>
          </div>
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
    </div>
  );
};

export default Home;