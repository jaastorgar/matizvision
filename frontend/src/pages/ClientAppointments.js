import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/authContext';

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = user?.email || localStorage.getItem('email');

        if (!token || !userEmail) {
          console.error('Error: Usuario no autenticado o correo no proporcionado.');
          return;
        }

        const { data } = await api.get('/appointments/client', {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: userEmail },
        });

        setAppointments(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px auto', maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Mis Citas</h1>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#777' }}>Cargando citas...</p>
      ) : appointments.length > 0 ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2 style={{ color: '#555', margin: '0 0 10px' }}>{appointment.service_type}</h2>
              <p style={{ margin: '5px 0' }}>
                <strong>Estado:</strong>{' '}
                <span
                  style={{
                    color:
                      appointment.status === 'Pendiente'
                        ? '#ff9800'
                        : appointment.status === 'Aprobado'
                        ? '#4caf50'
                        : '#f44336',
                  }}
                >
                  {appointment.status}
                </span>
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Hora:</strong> {appointment.time}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#555' }}>No tienes citas agendadas.</p>
      )}
    </div>
  );
};

export default ClientAppointments;