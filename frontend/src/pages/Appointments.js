import React, { useState } from 'react';
import api from '../services/api';

const Appointments = () => {
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    serviceType: '',
    status: 'Pendiente',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/appointments';

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No se encontró el token. Por favor, inicia sesión nuevamente.');
        return;
      }

      const payload = {
        date: newAppointment.date,
        time: newAppointment.time,
        service_type: newAppointment.serviceType,
        status: newAppointment.status,
      };

      console.log('Datos enviados al backend:', payload);

      await api.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Cita agendada con éxito');
      setNewAppointment({
        date: '',
        time: '',
        serviceType: '',
        status: 'Pendiente',
      });
    } catch (error) {
      console.error('Error al agendar la cita:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Hubo un problema al agendar la cita.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agendar Cita</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subtitle}>Completa los detalles de tu cita</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <select
            name="serviceType"
            value={newAppointment.serviceType}
            onChange={handleInputChange}
            required
            style={styles.select}
          >
            <option value="">Seleccione un servicio</option>
            <option value="Consulta Visual">Consulta Visual</option>
            <option value="Compra de Lentes">Compra de Lentes</option>
            <option value="Revisión de Lentes">Revisión de Lentes</option>
          </select>
          <button type="submit" style={styles.button}>
            Agendar Cita
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4caf50',
  },
  formContainer: {
    marginBottom: '40px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #dcdcdc',
    fontSize: '1rem',
  },
  select: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #dcdcdc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Appointments;