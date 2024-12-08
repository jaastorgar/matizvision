import React, { useState, useEffect } from 'react';
import api from '../api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments')
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error al cargar las citas:', error));
  }, []);

  return (
    <div>
      <h1>Citas</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.time} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;