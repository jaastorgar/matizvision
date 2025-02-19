import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [rut, setRut] = useState("");
  const [dv, setDv] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [notificaciones, setNotificaciones] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        navigate("/login");
        return;
      }
      setUsuario(storedUser);
      setRut(storedUser.rut || "");
      setDv(storedUser.dv || "");
      setNombre(storedUser.nombre);
      setApellidoPaterno(storedUser.apellidoPaterno || "");
      setApellidoMaterno(storedUser.apellidoMaterno || "");
      setEmail(storedUser.email);
      setTelefono(storedUser.telefono || "");
      setDireccion(storedUser.direccion || "");
    };
    fetchUsuario();
  }, [navigate]);

  const handleActualizarPerfil = async () => {
    try {
      await api.put(`/usuarios/${usuario.id}`, {
        rut,
        dv,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        telefono,
        direccion,
      });
      alert("✅ Perfil actualizado correctamente");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...usuario,
          rut,
          dv,
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          email,
          telefono,
          direccion,
        })
      );
    } catch (error) {
      alert("❌ Error al actualizar perfil");
    }
  };

  const handleCambiarContraseña = async () => {
    if (password !== confirmPassword) {
      alert("⚠️ Las contraseñas no coinciden");
      return;
    }
    try {
      await api.put(`/usuarios/${usuario.id}/cambiar-password`, { password });
      alert("✅ Contraseña actualizada correctamente");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("❌ Error al cambiar contraseña");
    }
  };

  const handleEliminarCuenta = async () => {
    const confirmacion = window.confirm(
      "⚠️ ¿Estás seguro de que quieres eliminar tu cuenta?"
    );
    if (confirmacion) {
      try {
        await api.delete(`/usuarios/${usuario.id}`);
        alert("🗑️ Cuenta eliminada correctamente");
        localStorage.removeItem("user");
        navigate("/register");
      } catch (error) {
        alert("❌ Error al eliminar cuenta");
      }
    }
  };

  return (
    <div style={modoOscuro ? darkContainerStyle : containerStyle}>
      <h2 style={titleStyle}>Perfil</h2>

      <div style={inputGroupStyle}>
        <label>RUT</label>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            style={{ ...inputStyle, width: "80%" }}
          />
          <input
            type="text"
            value={dv}
            onChange={(e) => setDv(e.target.value)}
            style={{ ...inputStyle, width: "20%" }}
            placeholder="DV"
          />
        </div>
      </div>

      <label>Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={inputStyle}
      />

      <label>Apellido Paterno</label>
      <input
        type="text"
        value={apellidoPaterno}
        onChange={(e) => setApellidoPaterno(e.target.value)}
        style={inputStyle}
      />

      <label>Apellido Materno</label>
      <input
        type="text"
        value={apellidoMaterno}
        onChange={(e) => setApellidoMaterno(e.target.value)}
        style={inputStyle}
      />

      <label>Correo Electrónico</label>
      <input type="email" value={email} disabled style={inputStyle} />

      <label>Teléfono</label>
      <input
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={inputStyle}
      />

      <label>Dirección de Envío</label>
      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleActualizarPerfil} style={buttonStyle}>
        Actualizar Perfil
      </button>

      <h3 style={sectionTitleStyle}>Configuración</h3>
      <label>
        <input
          type="checkbox"
          checked={notificaciones}
          onChange={() => setNotificaciones(!notificaciones)}
        />
        &nbsp; Recibir notificaciones por correo
      </label>

      <label>
        <input
          type="checkbox"
          checked={modoOscuro}
          onChange={() => setModoOscuro(!modoOscuro)}
        />
        &nbsp; Activar Modo Oscuro
      </label>

      <h3 style={sectionTitleStyle}>Cambio de Contraseña</h3>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleCambiarContraseña} style={buttonStyle}>
        Cambiar Contraseña
      </button>

      <button onClick={handleEliminarCuenta} style={deleteButtonStyle}>
        Eliminar Cuenta
      </button>
    </div>
  );
};

// Estilos actualizados
const containerStyle = {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "25px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
};

const darkContainerStyle = {
  ...containerStyle,
  backgroundColor: "#333",
  color: "#fff",
  border: "1px solid #666",
};

const titleStyle = {
  textAlign: "center",
  color: "#0a0a1f",
  marginBottom: "20px",
  fontSize: "22px",
  fontWeight: "bold",
};

const inputGroupStyle = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "5px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  backgroundColor: "#0a0a1f",
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#d9534f",
};

const sectionTitleStyle = {
  marginTop: "20px",
  fontSize: "18px",
  color: "#0a0a1f",
};

export default Perfil;