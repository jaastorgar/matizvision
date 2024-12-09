import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerText}>Panel de Administración</h1>
      </header>
      <nav style={styles.nav}>
        <Link to="/admin/products" style={styles.navLink}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Gestión de Productos</h2>
            <p style={styles.cardDescription}>
              Agrega, edita o elimina productos.
            </p>
          </div>
        </Link>
        <Link to="/admin/appointments" style={styles.navLink}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Gestión de Citas</h2>
            <p style={styles.cardDescription}>
              Gestiona citas solicitadas por los clientes.
            </p>
          </div>
        </Link>
        <Link to="/admin/users" style={styles.navLink}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Gestión de Usuarios</h2>
            <p style={styles.cardDescription}>
              Administra información de los usuarios.
            </p>
          </div>
        </Link>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f1f3f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  header: {
    backgroundColor: "#495057",
    width: "100%",
    padding: "15px 0",
    textAlign: "center",
    color: "#ffffff",
    borderRadius: "8px",
  },
  headerText: {
    margin: "0",
    fontSize: "24px",
  },
  nav: {
    marginTop: "20px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navLink: {
    textDecoration: "none",
    flexBasis: "30%",
    maxWidth: "300px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTitle: {
    fontSize: "20px",
    color: "#212529",
    margin: "0 0 10px 0",
  },
  cardDescription: {
    fontSize: "16px",
    color: "#6c757d",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
};

// Agregando estilos dinámicos con eventos (hover)
document.addEventListener("mouseover", (event) => {
  if (event.target.closest("div")?.style === styles.card) {
    event.target.closest("div").style.transform = styles.cardHover.transform;
    event.target.closest("div").style.boxShadow = styles.cardHover.boxShadow;
  }
});

document.addEventListener("mouseout", (event) => {
  if (event.target.closest("div")?.style === styles.card) {
    event.target.closest("div").style.transform = "none";
    event.target.closest("div").style.boxShadow = styles.card.boxShadow;
  }
});

export default AdminPanel;