import React, { useState } from 'react';
import api from '../services/api';

const Appointments = () => {
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    serviceType: '',
    user: {
      name: '',
      lastName: '',
      rut: '',
      dv: '',
      age: '',
      birthDate: '',
    },
  });
  const isLoggedIn = true; // Cambia esto según tu lógica de autenticación

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
      const field = name.split('.')[1];
      setNewAppointment((prev) => ({
        ...prev,
        user: { ...prev.user, [field]: value },
      }));
    } else {
      setNewAppointment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/api/appointments';

    try {
      const payload = {
        ...newAppointment,
        userId: isLoggedIn ? null : undefined, // Si está autenticado, asume que el backend asocia el cliente.
      };

      await api.post(endpoint, payload);
      alert('Cita agendada con éxito');
      setNewAppointment({
        date: '',
        time: '',
        serviceType: '',
        user: { name: '', lastName: '', rut: '', dv: '', age: '', birthDate: '' },
      });
    } catch (error) {
      console.error('Error al agendar la cita:', error);
      alert('Hubo un problema al agendar la cita.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Agendar Cita</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subtitle}>Agendar Cita</h2>
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
          {!isLoggedIn && (
            <>
              {['name', 'lastName', 'rut', 'dv', 'age', 'birthDate'].map((field) => (
                <input
                  key={field}
                  type={field === 'age' ? 'number' : field === 'birthDate' ? 'date' : 'text'}
                  name={`user.${field}`}
                  value={newAppointment.user[field]}
                  onChange={handleInputChange}
                  placeholder={field === 'birthDate' ? 'Fecha de Nacimiento' : field}
                  required
                  style={styles.input}
                />
              ))}
            </>
          )}
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