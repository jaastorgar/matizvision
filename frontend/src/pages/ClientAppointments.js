import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Configura correctamente la instancia de Axios

const ClientAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/api/appointments/client'); // Ajusta el endpoint según tu backend
        setAppointments(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Citas Realizadas</h1>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.date} - {appointment.time} ({appointment.serviceType})
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes citas agendadas.</p>
      )}
    </div>
  );
};

export default ClientAppointments;