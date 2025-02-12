import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";

const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Ópticos");
  const [carrito, setCarrito] = useState([]);

  // Lista de categorías (Escalable)
  const categorias = ["Ópticos", "Contactos", "Sol"];

  useEffect(() => {
    api.get("/products")
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3", color: "#000000", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header style={{ textAlign: "center", padding: "40px", backgroundColor: "#008000", color: "#ffffff" }}>
        <h1 style={{ fontSize: "2.5em" }}>Tienda de Lentes</h1>
        <p>Encuentra los mejores lentes para ti</p>
      </header>

      {/* Menú desplegable con estilos mejorados */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="categoria" style={{ fontSize: "1.2em", fontWeight: "bold", marginRight: "10px" }}>Categoría:</label>
        <select id="categoria" onChange={handleCategoriaChange} value={categoriaSeleccionada} style={selectStyle}>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>

      {/* Productos */}
      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2 style={{ color: "#008000", fontSize: "2em", marginBottom: "20px" }}>
          {categoriaSeleccionada}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {productos
            .filter(producto => producto.categoria === categoriaSeleccionada)
            .map(producto => (
              <div key={producto.id} style={cardStyle}>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: "100%", maxWidth: "220px", borderRadius: "8px" }} />
                <h3 style={{ color: "#008000" }}>{producto.nombre}</h3>
                <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#ff9900" }}>${producto.precio}</p>
                <button onClick={() => agregarAlCarrito(producto)} style={buttonAgregar}>Añadir al Carrito</button>
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
const selectStyle = {
  padding: "10px",
  fontSize: "1.1em",
  border: "1px solid #008000",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  color: "#008000",
  fontWeight: "bold"
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center"
};

const buttonAgregar = {
  backgroundColor: "#ff9900",
  color: "#ffffff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const linkStyle = {
  color: "#ffffff",
  backgroundColor: "#008000",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Lentes;