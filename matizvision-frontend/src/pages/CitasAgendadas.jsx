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
      const token = localStorage.getItem("token"); // ✅ Obtener el token

      if (!storedUser || !token) {
        navigate("/login"); // Redirigir si el usuario no está autenticado
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        const response = await api.get(`/citas/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Incluir el token en la solicitud
          }
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

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ textAlign: 'center', color: '#008000', marginBottom: '20px' }}>📅 Citas Agendadas</h2>

        {isLoading ? (
          <p>Cargando citas...</p>
        ) : citas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No tienes citas agendadas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {citas.map((cita) => (
              <li key={cita.id} style={citaStyle}>
                📍 <strong>Fecha:</strong> {cita.fecha} | ⏰ <strong>Hora:</strong> {cita.hora}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const citaStyle = {
  backgroundColor: '#e0ffe0',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  fontSize: '16px'
};

export default CitasAgendadas;