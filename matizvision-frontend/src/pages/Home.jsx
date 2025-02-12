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
    <div style={{ backgroundColor: "#D3D3D3", color: "#ffffff" }}> {/* Fondo plomo */}
      <Navbar />
      
      {/* Sección Principal */}
      <header style={{ textAlign: "center", padding: "40px", backgroundColor: "#008000", color: "#ffffff" }}> {/* Verde */}
        <h2>Tu visión, nuestra prioridad</h2>
        <p>Descubre los mejores productos ópticos y agenda tu consulta con nosotros.</p>
        <Link to="/citas" style={{ color: "#ffffff", backgroundColor: "#008000", padding: "10px", borderRadius: "5px", textDecoration: "none" }}>Agendar Cita</Link>
      </header>

      {/* Productos Destacados */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#008000" }}>Productos Destacados</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {productos.length > 0 ? (
            productos.slice(0, 4).map(producto => (
              <div key={producto.id} style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "10px", textAlign: "center", color: "#000000" }}> {/* Blanco */}
                <img src={producto.imagen} alt={producto.nombre} style={{ width: "200px", borderRadius: "5px" }} />
                <h3>{producto.nombre}</h3>
                <p>${producto.precio}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "#000000" }}>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* Beneficios */}
      <section style={{ padding: "40px", backgroundColor: "#008000", color: "#ffffff", textAlign: "center" }}> {/* Verde */}
        <h2>¿Por qué elegirnos?</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>✔️ Atención personalizada</li>
          <li>✔️ Última tecnología en lentes</li>
          <li>✔️ Precios accesibles</li>
          <li>✔️ Diagnóstico preciso</li>
        </ul>
      </section>

      {/* Testimonios */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#008000" }}>Lo que dicen nuestros clientes</h2>
        <p style={{ color: "#000000" }}>
          "La mejor óptica, servicio de calidad y lentes increíbles." - Juan Pérez
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;