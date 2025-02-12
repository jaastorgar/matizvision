import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "#0a0a1f",
      color: "#ffffff",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h1 style={{ color: "#00ffff" }}>Matiz Vision</h1>
      <ul style={{
        listStyle: "none",
        display: "flex",
        gap: "20px"
      }}>
        <li><Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Inicio</Link></li>
        <li><Link to="/productos" style={{ color: "#ffffff", textDecoration: "none" }}>Productos</Link></li>
        <li><Link to="/citas" style={{ color: "#ffffff", textDecoration: "none" }}>Agendar Cita</Link></li>
        <li><Link to="/login" style={{ color: "#ff9900", textDecoration: "none" }}>Iniciar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;