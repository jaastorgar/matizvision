import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos destacados:", error));
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5F5", color: "#333", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <header style={{ 
        textAlign: "center", 
        padding: "70px 20px", 
        backgroundColor: "#008000", 
        color: "#ffffff", 
        borderBottom: "5px solid #005500",
        borderRadius: "0 0 20px 20px"
      }}>
        <h1 style={{ fontSize: "2.8em", fontWeight: "bold" }}>Tu visión, nuestra prioridad</h1>
        <p style={{ fontSize: "1.3em", marginBottom: "20px" }}>
          Descubre los mejores productos ópticos y agenda tu consulta con nosotros.
        </p>
        <Link to="/citas" style={{ 
          color: "#ffffff", 
          backgroundColor: "#ff9900", 
          padding: "15px 25px", 
          borderRadius: "10px", 
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.2em",
          display: "inline-block",
          transition: "0.3s",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
        }}>
          Agendar Cita
        </Link>
      </header>

      {/* Productos Destacados */}
      <section style={{ padding: "60px", textAlign: "center" }}>
        <h2 style={{ color: "#008000", fontSize: "2.5em", marginBottom: "25px" }}>Productos Destacados</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
          gap: "25px", 
          justifyContent: "center" 
        }}>
          {productos.length > 0 ? (
            productos.slice(0, 4).map(producto => (
              <div key={producto.id} style={{ 
                backgroundColor: "#ffffff", 
                padding: "20px", 
                borderRadius: "10px", 
                textAlign: "center", 
                boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
                <img src={producto.imagen} alt={producto.nombre} style={{ 
                  width: "100%", 
                  maxWidth: "230px", 
                  borderRadius: "8px" 
                }} />
                <h3 style={{ margin: "15px 0", color: "#008000" }}>{producto.nombre}</h3>
                <p style={{ fontSize: "1.3em", fontWeight: "bold", color: "#ff9900" }}>${producto.precio}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#333", fontSize: "1.2em" }}>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Beneficios */}
      <section style={{ 
        padding: "60px", 
        backgroundColor: "#008000", 
        color: "#ffffff", 
        textAlign: "center",
        borderRadius: "20px",
        margin: "30px"
      }}>
        <h2 style={{ fontSize: "2.5em", marginBottom: "25px" }}>¿Por qué elegirnos?</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.3em", lineHeight: "2" }}>
          <li>✅ Atención personalizada</li>
          <li>✅ Última tecnología en lentes</li>
          <li>✅ Precios accesibles</li>
          <li>✅ Diagnóstico preciso</li>
        </ul>
      </section>

      {/* Testimonios */}
      <section style={{ padding: "60px", textAlign: "center" }}>
        <h2 style={{ color: "#008000", fontSize: "2.5em", marginBottom: "25px" }}>Lo que dicen nuestros clientes</h2>
        <blockquote style={{ 
          fontSize: "1.4em", 
          fontStyle: "italic", 
          color: "#333", 
          maxWidth: "650px", 
          margin: "0 auto", 
          backgroundColor: "#ffffff", 
          padding: "25px", 
          borderRadius: "12px",
          boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.15)"
        }}>
          "La mejor óptica, servicio de calidad y lentes increíbles." - Juan Pérez
        </blockquote>
      </section>

      <Footer />
    </div>
  );
};

export default Home;