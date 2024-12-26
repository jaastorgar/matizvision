import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Error: Usuario no autenticado.');
          return;
        }
        const { data } = await api.get('/appointments/client', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(data);
      } catch (error) {
        console.error(
          'Error al obtener las citas:',
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'pendiente':
        return { backgroundColor: '#ffeaa7', borderLeft: '5px solid #fdcb6e' };
      case 'aceptada':
        return { backgroundColor: '#dff9fb', borderLeft: '5px solid #00cec9' };
      case 'cancelada':
        return { backgroundColor: '#fab1a0', borderLeft: '5px solid #d63031' };
      default:
        return { backgroundColor: '#dfe6e9', borderLeft: '5px solid #b2bec3' };
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
        padding: '20px',
        maxWidth: '700px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h1
        style={{
          color: '#2c3e50',
          textAlign: 'center',
          borderBottom: '2px solid #3498db',
          paddingBottom: '10px',
        }}
      >
        Mis Citas
      </h1>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          Cargando citas...
        </p>
      ) : appointments.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            paddingTop: '20px',
          }}
        >
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                ...getStatusStyles(appointment.status),
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>
                <strong>Fecha:</strong>{' '}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Hora:</strong> {appointment.time}
              </p>
              <p>
                <strong>Servicio:</strong> {appointment.service_type}
              </p>
              <p>
                <strong>Estado:</strong> {appointment.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#555' }}>
          No tienes citas agendadas.
        </p>
      )}
    </div>
  );
};

export default ClientAppointments;