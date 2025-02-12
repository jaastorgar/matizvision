import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Verificar cambios en `localStorage` para actualizar el usuario en tiempo real
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      
      // Validar que el valor no sea `null` o `undefined`
      if (storedUser && storedUser !== "undefined") {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("❌ Error al parsear JSON:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    const fetchCarrito = () => {
      const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(carritoStorage);
    };

    fetchCarrito();

    // Escuchar cambios en `localStorage`
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <nav style={{
      backgroundColor: "#0a0a1f",
      color: "#ffffff",
      padding: "15px",
      display: location.pathname === "/login" ? "none" : "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative"
    }}>
      <h1 style={{ color: "#00ffff" }}>Matiz Vision</h1>

      <ul style={{
        listStyle: "none",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}>
        <li><Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Inicio</Link></li>
        <li><Link to="/lentes" style={{ color: "#ffffff", textDecoration: "none" }}>Tienda de Lentes</Link></li>
        <li><Link to="/citas" style={{ color: "#ffffff", textDecoration: "none" }}>Agendar Examen</Link></li>

        <li>
          <Link to="/carrito" style={{ color: "#ffffff", textDecoration: "none" }}>
            🛒 ({carrito.length})
          </Link>
        </li>

        {user ? (
          <li style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
              👤 {user.nombre}
            </button>
            {menuOpen && (
              <ul style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "#ffffff",
                color: "#0a0a1f",
                listStyle: "none",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                minWidth: "150px"
              }}>
                <li><Link to="/perfil" style={menuLink}>Perfil</Link></li>
                <li><Link to="/compras" style={menuLink}>Mis Compras</Link></li>
                <li><Link to="/seguimiento" style={menuLink}>Seguimiento de Compra</Link></li>
                <li><Link to="/citas-historial" style={menuLink}>Citas Agendadas</Link></li>
              </ul>
            )}
          </li>
        ) : (
          <li><Link to="/login" style={{ color: "#ff9900", textDecoration: "none" }}>Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  );
};

const menuLink = {
  textDecoration: "none",
  color: "#0a0a1f",
  display: "block",
  padding: "5px 10px"
};

export default Navbar;