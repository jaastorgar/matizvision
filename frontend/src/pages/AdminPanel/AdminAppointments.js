import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState({
    pending: [],
    approved: [],
    cancelled: [],
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(response.data);
        filterAppointments(response.data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  const filterAppointments = (appointments) => {
    const pending = appointments.filter((appt) => appt.status === "Pendiente");
    const approved = appointments.filter((appt) => appt.status === "Aprobado");
    const cancelled = appointments.filter((appt) => appt.status === "Cancelado");

    setFilteredAppointments({ pending, approved, cancelled });
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status });
      const updatedAppointments = appointments.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      );
      setAppointments(updatedAppointments);
      filterAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Gestión de Citas</h1>

      {["pending", "approved", "cancelled"].map((section) => (
        <div
          key={section}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ color: "#555" }}>
            {section === "pending" && "Pendientes"}
            {section === "approved" && "Aprobadas"}
            {section === "cancelled" && "Canceladas"}
          </h2>
          {filteredAppointments[section].length === 0 ? (
            <p style={{ color: "#999" }}>No hay citas en esta sección</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#f1f1f1" }}>
                    Fecha
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#f1f1f1" }}>
                    Cliente
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#f1f1f1" }}>
                    Estado
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "10px", backgroundColor: "#f1f1f1" }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments[section].map((appointment) => (
                  <tr key={appointment.id}>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{appointment.date}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{appointment.clientName}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>{appointment.status}</td>
                    <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                      {section === "pending" && (
                        <button
                          style={{
                            padding: "5px 10px",
                            margin: "0 5px",
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => updateAppointmentStatus(appointment.id, "Aprobado")}
                        >
                          Aprobar
                        </button>
                      )}
                      <button
                        style={{
                          padding: "5px 10px",
                          margin: "0 5px",
                          backgroundColor: "#f44336",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => updateAppointmentStatus(appointment.id, "Cancelado")}
                      >
                        Cancelar
                      </button>
                      <button
                        style={{
                          padding: "5px 10px",
                          margin: "0 5px",
                          backgroundColor: "#008CBA",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => console.log("Edit")}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminAppointments;