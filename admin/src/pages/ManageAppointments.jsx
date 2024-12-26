import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error al cargar las citas:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/appointments/${id}`, { status: newStatus });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Gestión de Citas</h1>
      {appointments.map((appointment) => (
        <div key={appointment.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Fecha:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {appointment.time}</p>
          <p><strong>Estado:</strong> {appointment.status}</p>
          <p><strong>Servicio:</strong> {appointment.service_type}</p>
          <button onClick={() => handleStatusChange(appointment.id, 'Aprobado')}>Aprobar</button>
          <button onClick={() => handleStatusChange(appointment.id, 'Cancelado')}>Cancelar</button>
          <button onClick={() => handleStatusChange(appointment.id, 'Reprogramado')}>Reprogramar</button>
        </div>
      ))}
    </div>
  );
};

export default ManageAppointments;