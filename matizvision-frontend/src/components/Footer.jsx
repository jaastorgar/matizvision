import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 Matiz Vision - Todos los derechos reservados</p>
      <p>Contacto: info@matizvision.com | Tel: +56 9 1234 5678</p>
    </footer>
  );
};

// ✅ **Estilos**
const footerStyle = {
  backgroundColor: "#ffffff", // ✅ Se cambió a blanco
  color: "#0a0a1f",
  textAlign: "center",
  padding: "15px",
  marginTop: "20px",
  borderTop: "2px solid #00ffff",
};

export default Footer;