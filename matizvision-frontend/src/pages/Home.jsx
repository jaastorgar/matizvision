import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import Slider from "react-slick"; // Carrusel moderno
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    // Obtener productos destacados
    api.get("/products")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos destacados:", error));

    // Obtener testimonios de clientes
    api.get("/testimonios")
      .then(response => setTestimonios(response.data))
      .catch(error => console.error("Error al obtener testimonios:", error));
  }, []);

  // Configuración del Carrusel de Nombres
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={pageStyle}>
      <Navbar />

      {/* Carrusel de Nombres */}
      <section style={heroSection}>
        <Slider {...carouselSettings}>
          <div style={carouselItem}><h2>Lentes de Sol</h2></div>
          <div style={carouselItem}><h2>Lentes Ópticos</h2></div>
          <div style={carouselItem}><h2>Lentes de Contacto</h2></div>
          <div style={carouselItem}><h2>Accesorios para Lentes</h2></div>
        </Slider>
      </section>

      {/* Sección de Productos Destacados */}
      <section style={productosSection}>
        <h2 style={sectionTitle}>🔥 Productos Destacados</h2>
        <div style={productosGrid}>
          {productos.length > 0 ? (
            productos.slice(0, 4).map(producto => (
              <div key={producto.id} style={productoCard}>
                <h3 style={productoNombre}>{producto.nombre}</h3>
                <p style={productoPrecio}>${producto.precio}</p>
                <button style={buttonComprar}>Comprar</button>
              </div>
            ))
          ) : (
            <p style={{ color: "#666", fontSize: "1.2em" }}>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section style={testimoniosSection}>
        <h2 style={sectionTitle}>💬 Testimonios de nuestros clientes</h2>
        <div style={testimoniosGrid}>
          {testimonios.length > 0 ? (
            testimonios.map(testimonio => (
              <div key={testimonio.id} style={testimonioCard}>
                <h3>{testimonio.nombre}</h3>
                <p>"{testimonio.mensaje}"</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#666", fontSize: "1.2em" }}>Aún no hay testimonios.</p>
          )}
        </div>
        <Link to="/dejar-testimonio">
          <button style={buttonTestimonio}>📝 Dejar Testimonio</button>
        </Link>
      </section>

      {/* Sección de Garantías */}
      <section style={garantiaSection}>
        <h2 style={sectionTitle}>🛡️ Nuestras Garantías</h2>
        <div style={garantiaGrid}>
          <div style={garantiaCard}>
            <h3>✅ Calidad Certificada</h3>
            <p>Estándares ópticos con garantía de fábrica.</p>
          </div>
          <div style={garantiaCard}>
            <h3>🔄 Cambios y Devoluciones</h3>
            <p>30 días para cambios sin complicaciones.</p>
          </div>
          <div style={garantiaCard}>
            <h3>💳 Pagos Seguros</h3>
            <p>Transacciones protegidas con múltiples métodos de pago.</p>
          </div>
          <div style={garantiaCard}>
            <h3>👓 Ajuste Perfecto</h3>
            <p>Revisión gratuita para adaptación de lentes.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// 🎨 **Estilos Modernos y Minimalistas**
const pageStyle = {
  backgroundColor: "#F5F5F5",
  color: "#222",
  fontFamily: "'Poppins', sans-serif",
};

const heroSection = {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  textAlign: "center",
  padding: "40px 0",
};

const carouselItem = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "120px",
  fontSize: "1.8em",
  fontWeight: "bold",
  background: "#008000",
  color: "white",
  borderRadius: "8px",
};

// Productos Destacados
const productosSection = {
  padding: "60px",
  textAlign: "center",
};

const sectionTitle = {
  color: "#008000",
  fontSize: "2.5em",
  marginBottom: "25px",
};

const productosGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  justifyContent: "center",
};

const productoCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
};

const productoNombre = {
  margin: "15px 0",
  color: "#008000",
};

const productoPrecio = {
  fontSize: "1.3em",
  fontWeight: "bold",
  color: "#ff9900",
};

const buttonComprar = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1em",
  fontWeight: "bold",
  marginTop: "10px",
  cursor: "pointer",
  transition: "0.3s",
};

// Estilos para testimonios
const testimoniosSection = {
  padding: "60px",
  textAlign: "center",
  backgroundColor: "#fff",
};

const testimoniosGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  justifyContent: "center",
};

const testimonioCard = {
  backgroundColor: "#F5F5F5",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
};

const buttonTestimonio = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  fontSize: "1em",
  fontWeight: "bold",
  marginTop: "20px",
  cursor: "pointer",
  transition: "0.3s",
};

const garantiaSection = {
  padding: "60px",
  textAlign: "center",
  backgroundColor: "#f8f9fa",
  borderRadius: "12px",
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  marginTop: "50px",
};

const garantiaGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  justifyContent: "center",
  marginTop: "30px",
};

const garantiaCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  fontSize: "1.1em",
  fontWeight: "bold",
};

export default Home;