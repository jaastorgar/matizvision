import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";

const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div style={{ backgroundColor: "#F8F9FA", color: "#000000", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ fontSize: "2.5em" }}>Nuestra Colección de Lentes</h1>
        <p>Explora nuestros modelos más exclusivos</p>
      </header>

      {/* Sección de Productos Destacados */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={sectionTitle}>🔥 Productos Destacados</h2>
        <div style={carouselContainer}>
          {productos.slice(0, 5).map(producto => (
            <div key={producto.id} style={carouselItem}>
              <img src={producto.imagen} alt={producto.nombre} style={imgStyle} />
              <h3>{producto.nombre}</h3>
              <p style={priceStyle}>${producto.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lista de Productos */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={sectionTitle}>🛍️ Todos los Productos</h2>
        <div style={gridContainer}>
          {productos.map(producto => (
            <div key={producto.id} style={cardStyle}>
              <div style={imgContainer}>
                <img src={producto.imagen} alt={producto.nombre} style={imgStyle} />
                {producto.nuevo && <span style={tagNuevo}>NUEVO</span>}
                {producto.oferta && <span style={tagOferta}>OFERTA</span>}
              </div>
              <h3>{producto.nombre}</h3>
              <p style={priceStyle}>${producto.precio}</p>
              <div style={ratingContainer}>
                {"⭐".repeat(producto.rating)} ({producto.reviews} reseñas)
              </div>
              <button onClick={() => agregarAlCarrito(producto)} style={buttonAgregar}>Añadir al Carrito</button>
              <Link to={`/producto/${producto.id}`} style={linkDetalle}>Ver Detalles</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Ir al Carrito */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/carrito" style={linkStyle}>🛒 Ir al Carrito ({carrito.length})</Link>
      </div>

      <Footer />
    </div>
  );
};

// Estilos Mejorados
const headerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#00A86B",
  color: "#ffffff"
};

const sectionTitle = {
  color: "#00A86B",
  fontSize: "2em",
  marginBottom: "20px"
};

const carouselContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  overflowX: "auto"
};

const carouselItem = {
  backgroundColor: "#ffffff",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  minWidth: "180px"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  position: "relative"
};

const imgContainer = {
  position: "relative"
};

const imgStyle = {
  width: "100%",
  maxWidth: "220px",
  borderRadius: "8px"
};

const tagNuevo = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "#00A86B",
  color: "white",
  padding: "5px",
  fontSize: "0.9em",
  borderRadius: "5px"
};

const tagOferta = {
  position: "absolute",
  top: "10px",
  right: "10px",
  backgroundColor: "#FF4500",
  color: "white",
  padding: "5px",
  fontSize: "0.9em",
  borderRadius: "5px"
};

const priceStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#FF9900"
};

const ratingContainer = {
  margin: "10px 0",
  fontSize: "1.2em",
  color: "#FFD700"
};

const buttonAgregar = {
  backgroundColor: "#00A86B",
  color: "#ffffff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

const linkDetalle = {
  display: "block",
  marginTop: "10px",
  color: "#00A86B",
  fontWeight: "bold",
  textDecoration: "none"
};

const linkStyle = {
  color: "#ffffff",
  backgroundColor: "#00A86B",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Lentes;