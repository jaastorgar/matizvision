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
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (examenSeleccionado) {
      setFechasDisponibles(["2025-04-20", "2025-04-21", "2025-04-22"]);
    }
  }, [examenSeleccionado]);

  useEffect(() => {
    if (fecha) {
      setHorasDisponibles(["10:00", "12:00", "14:00", "16:00"]);
    }
  }, [fecha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fecha || !hora) {
      setMensaje({ tipo: "error", texto: "❌ La fecha y la hora son obligatorias." });
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let citaData = { fecha, hora };

      if (user?.id) {
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
      }, 2500);

      setExamenSeleccionado('');
      setFecha('');
      setHora('');
      setEmail('');
      setTelefono('');
    } catch (error) {
      console.error("❌ Error al solicitar la cita:", error);
      setMensaje({ tipo: "error", texto: '❌ ' + (error.response?.data?.msg || "Error inesperado.") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="cita-wrapper">
        <div className="cita-card">
          <h2 className="cita-title">📅 Solicita tu Cita</h2>

          {mensaje && <p className={`cita-msg ${mensaje.tipo}`}>{mensaje.texto}</p>}

          <form className="cita-form" onSubmit={handleSubmit}>
            <label>Examen</label>
            <select value={examenSeleccionado} onChange={(e) => setExamenSeleccionado(e.target.value)} required>
              <option value="">Selecciona una opción</option>
              <option value="Examen Visual">👁 Examen Visual</option>
            </select>

            {examenSeleccionado && (
              <>
                <label>Fecha</label>
                <select value={fecha} onChange={(e) => setFecha(e.target.value)} required>
                  <option value="">Selecciona una fecha</option>
                  {fechasDisponibles.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </>
            )}

            {fecha && (
              <>
                <label>Hora</label>
                <select value={hora} onChange={(e) => setHora(e.target.value)} required>
                  <option value="">Selecciona una hora</option>
                  {horasDisponibles.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </>
            )}

            {!user && (
              <>
                <label>Correo electrónico</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Teléfono</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
              </>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "📌 Solicitar Cita"}
            </button>
          </form>
        </div>
      </section>
      <Footer />

      {/* Estilos embebidos */}
      <style>{`
        .cita-wrapper {
          padding: 4rem 1rem;
          background-color: #f9fafb;
          display: flex;
          justify-content: center;
        }

        .cita-card {
          background: white;
          padding: 2rem;
          max-width: 480px;
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .cita-title {
          text-align: center;
          color: #2d8f2d;
          margin-bottom: 1.5rem;
        }

        .cita-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cita-form select,
        .cita-form input {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .cita-form button {
          background: #2d8f2d;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .cita-msg.error {
          color: red;
          text-align: center;
          margin-bottom: 1rem;
        }

        .cita-msg.éxito {
          color: green;
          text-align: center;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
}

export default Citas;