import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const CitasAgendadas = () => {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        navigate("/login");
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        const response = await api.get(`/citas/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCitas(response.data);
      } catch (error) {
        console.error("❌ Error al obtener citas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCitas();
  }, [navigate]);

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Santiago"
    });
  };

  const secciones = {
    pendiente: { titulo: '🕒 Citas Pendientes', color: '#ffcc00' },
    confirmada: { titulo: '✅ Citas Confirmadas', color: '#00cc66' },
    rechazada: { titulo: '❌ Citas Rechazadas', color: '#ff6666' },
    reprogramada: { titulo: '🔁 Citas Reprogramadas', color: '#cc66ff' },
  };

  const agruparCitas = () => {
    return citas.reduce((grupos, cita) => {
      const estado = cita.estado || 'pendiente';
      if (!grupos[estado]) grupos[estado] = [];
      grupos[estado].push(cita);
      return grupos;
    }, {});
  };

  const citasAgrupadas = agruparCitas();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📅 Mis Citas</h2>

        {isLoading ? (
          <p style={styles.loading}>Cargando citas...</p>
        ) : citas.length === 0 ? (
          <p style={styles.noCitas}>No tienes citas agendadas.</p>
        ) : (
          Object.entries(secciones).map(([estado, { titulo, color }]) => (
            <div key={estado}>
              <h3 style={{ ...styles.seccionTitulo, color }}>{titulo}</h3>
              {citasAgrupadas[estado]?.length > 0 ? (
                citasAgrupadas[estado].map((cita) => (
                  <div key={cita.id} style={{ ...styles.citaCard, borderLeft: `5px solid ${color}` }}>
                    <p>
                      📍 <strong>Fecha:</strong> <span style={styles.fecha}>{formatFecha(cita.fecha)}</span><br />
                      ⏰ <strong>Hora:</strong> <span style={styles.hora}>{formatHora(cita.fecha)}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p style={styles.vacio}>No hay citas {estado}s.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🎨 Estilos
const styles = {
  page: {
    backgroundColor: '#0a0a1f',
    minHeight: '100vh',
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  },
  title: {
    color: '#00cc99',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '30px',
  },
  seccionTitulo: {
    marginTop: '25px',
    fontSize: '22px',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
  },
  noCitas: {
    textAlign: 'center',
    color: '#ff00ff',
    fontWeight: 'bold',
  },
  citaCard: {
    backgroundColor: '#f2f2f2',
    padding: '15px',
    borderRadius: '10px',
    margin: '10px 0',
  },
  fecha: {
    color: '#008000',
  },
  hora: {
    color: '#ff9900',
  },
  vacio: {
    color: '#aaa',
    fontStyle: 'italic',
    marginLeft: '10px',
  }
};

export default CitasAgendadas;