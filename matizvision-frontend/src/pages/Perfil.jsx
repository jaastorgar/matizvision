import React, { useState, useEffect } from "react";
import axios from "../api/axiosConfig";

const Perfil = () => {
    const [activeSection, setActiveSection] = useState("perfil"); // Maneja la sección activa

    const [userData, setUserData] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        rut: "",
        dv: "",
        telefono: "",
        email: "",
        direccion: "",
    });

    useEffect(() => {
        axios.get("/auth/profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error("❌ Error al obtener datos del usuario:", error);
            alert("No se pudo cargar la información del perfil.");
        });
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/auth/update-profile", userData);
            alert(response.data.msg);
        } catch (error) {
            console.error("❌ Error al actualizar perfil:", error.response?.data || error.message);
            alert(error.response?.data?.msg || "Error al actualizar el perfil.");
        }
    };

    return (
        <div style={styles.container}>
            {/* Barra lateral */}
            <div style={styles.sidebar}>
                <h2 style={styles.title}>Hola, {userData.nombre}</h2>
                <ul style={styles.menu}>
                    <li style={activeSection === "perfil" ? styles.menuItemActive : styles.menuItem} onClick={() => setActiveSection("perfil")}>📌 Mi Perfil</li>
                    <li style={activeSection === "compras" ? styles.menuItemActive : styles.menuItem} onClick={() => setActiveSection("compras")}>🛒 Mis Compras</li>
                    <li style={activeSection === "ayuda" ? styles.menuItemActive : styles.menuItem} onClick={() => setActiveSection("ayuda")}>❓ Ayuda</li>
                    <li style={activeSection === "configurar" ? styles.menuItemActive : styles.menuItem} onClick={() => setActiveSection("configurar")}>⚙️ Configurar Cuenta</li>
                </ul>
            </div>

            {/* Contenido dinámico */}
            <div style={styles.content}>
                {activeSection === "perfil" && (
                    <div>
                        <h2 style={styles.profileTitle}>Datos Personales</h2>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <div style={styles.inputContainer}>
                                    <label style={styles.label}>Nombre</label>
                                    <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <label style={styles.label}>Apellido Paterno</label>
                                    <input type="text" name="apellido_paterno" value={userData.apellido_paterno} onChange={handleChange} style={styles.input} />
                                </div>
                                <div style={styles.inputContainer}>
                                    <label style={styles.label}>Apellido Materno</label>
                                    <input type="text" name="apellido_materno" value={userData.apellido_materno} onChange={handleChange} style={styles.input} />
                                </div>
                            </div>
                            <button type="submit" style={styles.button}>Actualizar Perfil</button>
                        </form>
                    </div>
                )}

                {activeSection === "compras" && <h2 style={styles.sectionTitle}>📦 Aquí verás tus compras</h2>}
                {activeSection === "ayuda" && <h2 style={styles.sectionTitle}>❓ Centro de Ayuda</h2>}
                {activeSection === "configurar" && <h2 style={styles.sectionTitle}>⚙️ Configuración de la Cuenta</h2>}
            </div>
        </div>
    );
};

// **Estilos**
const styles = {
    container: {
        display: "flex",
        height: "100vh",
        backgroundColor: "#f8f9fa",
    },
    sidebar: {
        width: "250px",
        background: "#ffffff",
        padding: "20px",
        borderRight: "1px solid #ddd",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "20px",
    },
    menu: {
        listStyle: "none",
        padding: 0,
    },
    menuItem: {
        padding: "10px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
        color: "#555",
    },
    menuItemActive: {
        padding: "10px",
        cursor: "pointer",
        borderBottom: "1px solid #eee",
        color: "#008000",
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: "30px",
    },
    profileTitle: {
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    sectionTitle: {
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    form: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    inputGroup: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
    },
    inputContainer: {
        flex: 1,
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        backgroundColor: "#008000",
        color: "#ffffff",
        padding: "12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s",
    },
};

export default Perfil;