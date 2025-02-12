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
    <div style={{ backgroundColor: "#D3D3D3", color: "#000000", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Sección Principal */}
      <header style={{ 
        textAlign: "center", 
        padding: "60px 20px", 
        backgroundColor: "#008000", 
        color: "#ffffff", 
        borderBottom: "5px solid #005500"
      }}>
        <h1 style={{ fontSize: "2.5em", fontWeight: "bold" }}>Tu visión, nuestra prioridad</h1>
        <p style={{ fontSize: "1.2em" }}>Descubre los mejores productos ópticos y agenda tu consulta con nosotros.</p>
        <Link to="/citas" style={{ 
          color: "#ffffff", 
          backgroundColor: "#ff9900", 
          padding: "12px 20px", 
          borderRadius: "8px", 
          textDecoration: "none",
          fontWeight: "bold",
          display: "inline-block",
          marginTop: "15px",
          transition: "0.3s"
        }}>Agendar Cita</Link>
      </header>

      {/* Productos Destacados */}
      <section style={{ padding: "50px", textAlign: "center" }}>
        <h2 style={{ color: "#008000", fontSize: "2em", marginBottom: "20px" }}>Productos Destacados</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px", 
          justifyContent: "center" 
        }}>
          {productos.length > 0 ? (
            productos.slice(0, 4).map(producto => (
              <div key={producto.id} style={{ 
                backgroundColor: "#ffffff", 
                padding: "20px", 
                borderRadius: "10px", 
                textAlign: "center", 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "0.3s"
              }}>
                <img src={producto.imagen} alt={producto.nombre} style={{ 
                  width: "100%", 
                  maxWidth: "220px", 
                  borderRadius: "8px" 
                }} />
                <h3 style={{ margin: "15px 0", color: "#008000" }}>{producto.nombre}</h3>
                <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#ff9900" }}>${producto.precio}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#000000", fontSize: "1.1em" }}>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Beneficios */}
      <section style={{ 
        padding: "50px", 
        backgroundColor: "#008000", 
        color: "#ffffff", 
        textAlign: "center",
        borderRadius: "20px",
        margin: "20px"
      }}>
        <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>¿Por qué elegirnos?</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2em" }}>
          <li>✔️ Atención personalizada</li>
          <li>✔️ Última tecnología en lentes</li>
          <li>✔️ Precios accesibles</li>
          <li>✔️ Diagnóstico preciso</li>
        </ul>
      </section>

      {/* Testimonios */}
      <section style={{ padding: "50px", textAlign: "center" }}>
        <h2 style={{ color: "#008000", fontSize: "2em", marginBottom: "20px" }}>Lo que dicen nuestros clientes</h2>
        <blockquote style={{ 
          fontSize: "1.3em", 
          fontStyle: "italic", 
          color: "#000000", 
          maxWidth: "600px", 
          margin: "0 auto", 
          backgroundColor: "#ffffff", 
          padding: "20px", 
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
        }}>
          "La mejor óptica, servicio de calidad y lentes increíbles." - Juan Pérez
        </blockquote>
      </section>

      <Footer />
    </div>
  );
};

export default Home;