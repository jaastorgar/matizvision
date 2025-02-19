import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        rut: "",
        dv: "",
        telefono: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/auth/register", formData);
            alert(response.data.msg);
            navigate("/login");
        } catch (error) {
            console.error("❌ Error en el registro:", error.response?.data || error.message);
            alert(error.response?.data?.msg || "Error al registrar usuario.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <img src="/matiz.png" alt="Logo de Matiz Vision" style={styles.logo} />
                <h2 style={styles.title}>Registro de Cliente</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required style={styles.input} />

                    <div style={styles.inputGroup}>
                        <input type="text" name="apellido_paterno" placeholder="Apellido Paterno" value={formData.apellido_paterno} onChange={handleChange} required style={styles.input} />
                        <input type="text" name="apellido_materno" placeholder="Apellido Materno" value={formData.apellido_materno} onChange={handleChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <input type="text" name="rut" placeholder="RUT (Sin puntos ni guion)" value={formData.rut} onChange={handleChange} required style={styles.input} />
                        <input type="text" name="dv" placeholder="Dígito Verificador" value={formData.dv} onChange={handleChange} required style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required style={styles.input} />
                        <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required style={styles.input} />
                    </div>

                    <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={styles.input} />

                    <button type="submit" style={styles.button}>Registrarse</button>
                </form>
            </div>
        </div>
    );
};

// **Estilos**
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F3F4F6",
    },
    card: {
        background: "#ffffff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "400px",
    },
    logo: {
        width: "150px",
        marginBottom: "20px",
    },
    title: {
        color: "#008000",
        fontWeight: "bold",
        marginBottom: "20px",
        fontSize: "22px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    inputGroup: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #008000",
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
        marginTop: "15px",
        fontWeight: "bold",
        fontSize: "16px",
        transition: "background 0.3s",
    },
};

export default Register;