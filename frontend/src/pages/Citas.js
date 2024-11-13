// src/pages/Citas.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Citas = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (isAuthenticated) {
      axios.get('http://localhost:5000/api/appointments/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error al cargar citas:', error));
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      await axios.post('http://localhost:5000/api/appointments/create', formData, config);
      alert('Cita creada con éxito');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', serviceType: '' });
    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert('Error al crear la cita');
    }
  };

  return (
    <CitasContainer>
      <h2>Agendar Cita</h2>
      <FormContainer onSubmit={handleSubmit}>
        {!isAuthenticated && (
          <>
            <FormLabel>
              Nombre:
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormLabel>
            <FormLabel>
              Correo Electrónico:
              <FormInput
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormLabel>
            <FormLabel>
              Teléfono:
              <FormInput
                type="tel"
                maxLength="9"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </FormLabel>
          </>
        )}
        <FormLabel>
          Fecha:
          <FormInput
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </FormLabel>
        <FormLabel>
          Hora:
          <FormInput
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </FormLabel>
        <FormLabel>
          Tipo de Servicio:
          <FormInput
            type="text"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            required
          />
        </FormLabel>
        <FormButton type="submit">Agendar Cita</FormButton>
      </FormContainer>
      
      {isAuthenticated && (
        <AppointmentsContainer>
          <h3>Mis Citas</h3>
          <AppointmentList>
            {appointments.map((appointment) => (
              <AppointmentItem key={appointment.id}>
                {appointment.date} - {appointment.time} - {appointment.serviceType} ({appointment.status})
              </AppointmentItem>
            ))}
          </AppointmentList>
        </AppointmentsContainer>
      )}
    </CitasContainer>
  );
};

export default Citas;

// Estilos con Styled Components
const CitasContainer = styled.div`
  padding: 40px 20px;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #333;
`;

const FormInput = styled.input`
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #006400;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004d00;
  }
`;

const AppointmentsContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const AppointmentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AppointmentItem = styled.li`
  background-color: #f1f1f1;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;