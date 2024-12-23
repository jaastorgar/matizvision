import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/appointments/client');
        setAppointments(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Citas Realizadas</h1>
        {loading ? (
          <p style={styles.message}>Cargando citas...</p>
        ) : appointments.length > 0 ? (
          <ul style={styles.list}>
            {appointments.map((appointment) => (
              <li key={appointment.id} style={styles.listItem}>
                <strong>Fecha:</strong> {appointment.date} <br />
                <strong>Hora:</strong> {appointment.time} <br />
                <strong>Servicio:</strong> {appointment.serviceType} <br />
                <strong>Estado:</strong> {appointment.status}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.message}>No tienes citas agendadas.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default ClientAppointments;