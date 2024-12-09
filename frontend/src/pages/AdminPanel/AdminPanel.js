import React, { useState } from "react";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("Inicio");

  const renderSection = () => {
    switch (activeSection) {
      case "Productos":
        return <ProductsSection />;
      case "Citas":
        return <AppointmentsSection />;
      case "Usuarios":
        return <UsersSection />;
      default:
        return (
          <div>
            <h2 style={styles.sectionTitle}>Bienvenido al panel de administración</h2>
            <p style={styles.sectionDescription}>
              Selecciona una sección del menú para comenzar.
            </p>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Panel de Administración</h1>
      </header>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li
            style={styles.navItem}
            onClick={() => setActiveSection("Productos")}
          >
            Productos
          </li>
          <li
            style={styles.navItem}
            onClick={() => setActiveSection("Citas")}
          >
            Citas
          </li>
          <li
            style={styles.navItem}
            onClick={() => setActiveSection("Usuarios")}
          >
            Usuarios
          </li>
        </ul>
      </nav>
      <main style={styles.main}>{renderSection()}</main>
    </div>
  );
};

const ProductsSection = () => (
  <div>
    <h2 style={styles.sectionTitle}>Gestión de Productos</h2>
    <p style={styles.sectionDescription}>
      Aquí puedes agregar, editar o eliminar productos.
    </p>
  </div>
);

const AppointmentsSection = () => (
  <div>
    <h2 style={styles.sectionTitle}>Gestión de Citas</h2>
    <p style={styles.sectionDescription}>
      Aquí puedes revisar y gestionar las citas de los clientes.
    </p>
  </div>
);

const UsersSection = () => (
  <div>
    <h2 style={styles.sectionTitle}>Gestión de Usuarios</h2>
    <p style={styles.sectionDescription}>
      Aquí puedes gestionar los usuarios registrados en el sistema.
    </p>
  </div>
);

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  nav: {
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
  },
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "space-around",
  },
  navItem: {
    cursor: "pointer",
    padding: "10px 20px",
    textAlign: "center",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    color: "white",
  },
  navItemHover: {
    backgroundColor: "#4CAF50",
  },
  main: {
    flex: 1,
    padding: "20px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  sectionDescription: {
    fontSize: "16px",
    color: "#555",
  },
};

export default AdminPanel;