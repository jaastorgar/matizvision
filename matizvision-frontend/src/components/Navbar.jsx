import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
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

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav style={{
      backgroundColor: "#0a0a1f",
      color: "#ffffff",
      padding: "15px",
      display: location.pathname === "/login" || location.pathname === "/register" ? "none" : "flex",
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
                minWidth: "180px"
              }}>
                <li><Link to="/perfil" style={menuLink}>Perfil</Link></li>
                <li><Link to="/compras" style={menuLink}>Mis Compras</Link></li>
                <li><Link to="/seguimiento" style={menuLink}>Seguimiento de Compra</Link></li>
                <li><Link to="/citas-agendadas" style={menuLink}>Citas Agendadas</Link></li>
                <li><button onClick={handleLogout} style={logoutButton}>❌ Cerrar Sesión</button></li>
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
  padding: "5px 10px",
  cursor: "pointer"
};

const logoutButton = {
  background: "none",
  border: "none",
  color: "#ff0000",
  fontSize: "14px",
  cursor: "pointer",
  padding: "5px 10px",
  width: "100%",
  textAlign: "left"
};

export default Navbar;