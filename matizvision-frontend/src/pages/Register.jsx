import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);
      setMensaje("✅ Registro exitoso. Redirigiendo...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      setMensaje("❌ Error al registrar usuario. Verifica los datos.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainer}>
        <h2 style={titleStyle}>Registro de Cliente</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required style={inputStyle} />
          <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={inputStyle} />

          <button type="submit" style={buttonStyle}>Registrarse</button>
        </form>

        {mensaje && <p style={mensaje.includes("✅") ? successStyle : errorStyle}>{mensaje}</p>}

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: "#008000", fontWeight: "bold" }}>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};

// **Estilos en JS**
const containerStyle = {
  backgroundColor: "#D3D3D3",
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formContainer = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
};

const titleStyle = {
  color: "#008000",
  fontSize: "1.8em",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #008000",
};

const buttonStyle = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2em",
  fontWeight: "bold",
};

const successStyle = {
  color: "#008000",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "10px",
};

const errorStyle = {
  color: "#ff0000",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "10px",
};

export default Register;