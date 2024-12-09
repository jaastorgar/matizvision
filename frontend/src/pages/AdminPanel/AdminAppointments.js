import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Gestión de Citas</h1>
      {/* Aquí puedes agregar funcionalidades para CRUD */}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.clientName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAppointments;