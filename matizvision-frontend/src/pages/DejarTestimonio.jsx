import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const DejarTestimonio = () => {
    const [nombre, setNombre] = useState("");
    const [comentario, setComentario] = useState("");
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el usuario desde localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comentario.trim() || (!usuario && !nombre.trim())) {
            alert("⚠️ Por favor, completa todos los campos antes de enviar.");
            return;
        }

        try {
            const response = await api.post("/testimonios", {
                nombre: usuario ? usuario.nombre : nombre,
                comentario,
                usuarioId: usuario ? usuario.id : null, 
            });

            if (response.status === 201) {
                alert("✅ Testimonio enviado con éxito. ¡Gracias por tu opinión!");
                navigate("/");
            } else {
                alert("❌ Error inesperado. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("❌ Error al enviar testimonio:", error);
            alert("❌ Ocurrió un error. Inténtalo nuevamente.");
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>📝 Dejar un Testimonio</h2>
            <form style={formStyle} onSubmit={handleSubmit}>
                {!usuario && (
                    <>
                        <label style={labelStyle}>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            style={inputStyle}
                        />
                    </>
                )}

                <label style={labelStyle}>Tu Opinión:</label>
                <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    required
                    style={textareaStyle}
                />

                <button type="submit" style={buttonStyle}>Enviar Testimonio</button>
            </form>
        </div>
    );
};

// 🎨 Estilos
const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center"
};

const titleStyle = {
    color: "#008000",
    fontSize: "1.8em",
    marginBottom: "20px"
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
};

const labelStyle = {
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "5px"
};

const inputStyle = {
    padding: "10px",
    fontSize: "1em",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd"
};

const textareaStyle = {
    padding: "10px",
    fontSize: "1em",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    height: "100px"
};

const buttonStyle = {
    backgroundColor: "#008000",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1em",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px"
};

export default DejarTestimonio;