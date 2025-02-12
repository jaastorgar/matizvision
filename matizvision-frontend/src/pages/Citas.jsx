import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await api.get('/citas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error al obtener citas', error);
      }
    };
    fetchCitas();
  }, []);

  return (
    <div>
      <h2>Tus Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>{cita.fecha} - {cita.estado}</li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;