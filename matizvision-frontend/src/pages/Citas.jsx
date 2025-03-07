import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Citas() {
  const [examenSeleccionado, setExamenSeleccionado] = useState('');
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [fecha, setFecha] = useState('');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [hora, setHora] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [user, setUser] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("❌ Error al parsear el usuario:", error);
      }
    }
  }, []);

  // Simular fechas disponibles (Esto podría venir de una API en un futuro)
  useEffect(() => {
    if (examenSeleccionado) {
      setFechasDisponibles(["2025-03-10", "2025-03-12", "2025-03-14"]);
    }
  }, [examenSeleccionado]);

  // Simular horas disponibles (Esto podría venir de una API en un futuro)
  useEffect(() => {
    if (fecha) {
      setHorasDisponibles(["10:00", "12:00", "14:00", "16:00"]);
    }
  }, [fecha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");

        // Construcción de la data de la cita
        let citaData = { fecha, hora };

        if (user?.id) { // Solo agrega usuarioId si el usuario está autenticado
            citaData.usuarioId = user.id;
        } else {
            citaData.email = email;
            citaData.telefono = telefono;
        }

        const headers = {};
        if (user && token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await api.post('/citas', citaData, { headers });

        setMensaje({ tipo: "éxito", texto: response.data.msg || "✅ Cita solicitada con éxito" });

        setTimeout(() => {
            window.location.href = "/"; 
        }, 3000);

        setExamenSeleccionado('');
        setFecha('');
        setHora('');
        setEmail('');
        setTelefono('');
    } catch (error) {
        setMensaje({ tipo: "error", texto: '❌ Error al solicitar la cita: ' + (error.response?.data?.msg || error.message) });
    }
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={formStyle}>
          <h2 style={titleStyle}>📅 Solicitar Cita</h2>
          {mensaje && <p style={{ color: mensaje.tipo === "error" ? "red" : "green", textAlign: "center" }}>{mensaje.texto}</p>}

          <form onSubmit={handleSubmit} style={formContainerStyle}>
            {/* Selección del tipo de examen */}
            <label style={labelStyle}>Selecciona un examen:</label>
            <select value={examenSeleccionado} onChange={(e) => setExamenSeleccionado(e.target.value)} required style={inputStyle}>
              <option value="">Selecciona una opción</option>
              <option value="Examen Visual">👀 Examen Visual</option>
            </select>

            {/* Selección de fecha disponible */}
            {examenSeleccionado && (
              <>
                <label style={labelStyle}>Fecha disponible:</label>
                <select value={fecha} onChange={(e) => setFecha(e.target.value)} required style={inputStyle}>
                  <option value="">Selecciona una fecha</option>
                  {fechasDisponibles.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </>
            )}

            {/* Selección de hora disponible */}
            {fecha && (
              <>
                <label style={labelStyle}>Hora disponible:</label>
                <select value={hora} onChange={(e) => setHora(e.target.value)} required style={inputStyle}>
                  <option value="">Selecciona una hora</option>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </>
            )}

            {/* Campos adicionales solo para usuarios no autenticados */}
            {!user && fecha && hora && (
              <>
                <label style={labelStyle}>Correo:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

                <label style={labelStyle}>Teléfono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={inputStyle} />
              </>
            )}

            <button type="submit" style={buttonStyle}>📌 Solicitar Cita</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Estilos
const containerStyle = {
  padding: '40px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '500px'
};

const titleStyle = {
  textAlign: 'center',
  color: '#008000',
  marginBottom: '20px'
};

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px'
};

const buttonStyle = {
  backgroundColor: '#008000',
  color: '#ffffff',
  padding: '12px',
  border: 'none',
  borderRadius: '5px',
  width: '100%',
  cursor: 'pointer',
  fontSize: '18px',
  marginTop: '15px'
};

export default Citas;