import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/matiz.png";
import { FontSizeContext } from "../context/FontSizeContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const { fontSize, increaseFont, decreaseFont, resetFont } = useContext(FontSizeContext);

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

    const fetchCarrito = () => {
      try {
        const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoStorage);
      } catch (err) {
        console.error("❌ Error cargando carrito:", err);
        setCarrito([]);
      }
    };

    checkUser();
    fetchCarrito();

    window.addEventListener("storage", checkUser);
    window.addEventListener("carritoActualizado", fetchCarrito);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("carritoActualizado", fetchCarrito);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav style={{ ...navStyle, fontSize: `${fontSize}px` }}>
      <Link to="/" style={logoContainer}>
        <img src={logo} alt="Matiz Vision Logo" style={logoStyle} />
      </Link>

      <ul style={menuStyle}>
        <li><Link to="/" style={linkStyle}>Inicio</Link></li>
        <li><Link to="/lentes" style={linkStyle}>Tienda de Lentes</Link></li>
        <li><Link to="/citas" style={linkStyle}>Agendar Examen</Link></li>
        <li><Link to="/carrito" style={linkStyle}>🛒 ({carrito.length})</Link></li>

        {user ? (
          <li
            style={{ position: "relative" }}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button style={userButton}>👤 {user.nombre}</button>
            {menuOpen && (
              <ul style={dropdownMenu}>
                <li><Link to="/perfil" style={menuLink}>Perfil</Link></li>
                <li><Link to="/compras" style={menuLink}>Mis Compras</Link></li>
                <li><Link to="/seguimiento" style={menuLink}>Seguimiento de Compra</Link></li>
                <li><Link to="/citas-agendadas" style={menuLink}>Citas Agendadas</Link></li>
                <li><button onClick={handleLogout} style={logoutButton}>❌ Cerrar Sesión</button></li>
              </ul>
            )}
          </li>
        ) : (
          <li><Link to="/login" style={{ ...linkStyle, color: "#ff9900" }}>Iniciar Sesión</Link></li>
        )}

        {/* 🔠 Controles de accesibilidad de tamaño de fuente */}
        <li>
          <button onClick={decreaseFont} style={fontControl}>A-</button>
          <button onClick={resetFont} style={fontControl}>A</button>
          <button onClick={increaseFont} style={fontControl}>A+</button>
        </li>
      </ul>
    </nav>
  );
};

// Estilos
const navStyle = {
  backgroundColor: "#ffffff",
  color: "#0a0a1f",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  borderBottom: "2px solid #00ffff",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  height: "200px",
  width: "auto",
  position: "absolute",
  top: "42%",
  left: "10px",
  transform: "translateY(-50%)",
};

const menuStyle = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "#0a0a1f",
  textDecoration: "none",
  fontWeight: "bold",
};

const userButton = {
  background: "none",
  border: "none",
  color: "#0a0a1f",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const dropdownMenu = {
  position: "absolute",
  top: "100%",
  right: 0,
  backgroundColor: "#ffffff",
  color: "#0a0a1f",
  listStyle: "none",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "180px",
  zIndex: 10,
};

const menuLink = {
  textDecoration: "none",
  color: "#0a0a1f",
  display: "block",
  padding: "5px 10px",
  cursor: "pointer",
};

const logoutButton = {
  background: "none",
  border: "none",
  color: "#ff0000",
  fontSize: "14px",
  cursor: "pointer",
  padding: "5px 10px",
  width: "100%",
  textAlign: "left",
};

const fontControl = {
  fontSize: "16px",
  padding: "4px 8px",
  margin: "0 2px",
  backgroundColor: "#eee",
  border: "1px solid #ccc",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Navbar;