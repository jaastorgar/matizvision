import { useEffect, useState } from "react";
import api from "../api/api"; 
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background: #333;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #666;
`;

const Button = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  background: ${(props) =>
    props["data-action"] === "confirmar" ? "green" :
    props["data-action"] === "reagendar" ? "blue" :
    props["data-action"] === "rechazar" ? "red" : "gray"};
`;

const GestionCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Enviando solicitud a API...");
      
      const response = await api.get("/admincitas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Datos recibidos:", response.data);
      setCitas(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Error al cargar citas.");
      console.error("❌ Error al obtener citas:", err);
    }
    setLoading(false);
  };

  const actualizarEstadoCita = async (id, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/admincitas/${id}`, { estado: nuevoEstado }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje(`✅ Cita ${id} actualizada a ${nuevoEstado}`);
      fetchCitas();
    } catch (err) {
      console.error("❌ Error al actualizar cita:", err);
      setMensaje("⚠️ Error al actualizar cita.");
    }
  };

  return (
    <Container>
      <h2>📅 Gestión de Citas</h2>

      {mensaje && <p style={{ color: "yellow" }}>{mensaje}</p>}

      {loading ? (
        <p>🔄 Cargando citas...</p>
      ) : error ? (
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : citas.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Fecha</Th>
              <Th>Hora</Th>
              <Th>Cliente</Th>
              <Th>Teléfono</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => {
              const fechaCita = new Date(cita.fecha);
              return (
                <tr key={cita.id}>
                  <Td>{cita.id}</Td>
                  <Td>{fechaCita.toISOString().split("T")[0]}</Td>
                  <Td>
                    {fechaCita.toLocaleTimeString("es-CL", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                      timeZone: "America/Santiago",
                    })}
                  </Td>
                  <Td>{cita.clienteNombre || "No disponible"}</Td>
                  <Td>{cita.clienteTelefono || "No disponible"}</Td>
                  <Td>{cita.estado}</Td>
                  <Td>
                    <Button data-action="confirmar" onClick={() => actualizarEstadoCita(cita.id, "confirmada")}>
                      ✅ Confirmar
                    </Button>
                    <Button data-action="reagendar" onClick={() => actualizarEstadoCita(cita.id, "reprogramada")}>
                      🔄 Reprogramar
                    </Button>
                    <Button data-action="rechazar" onClick={() => actualizarEstadoCita(cita.id, "rechazada")}>
                      ❌ Rechazar
                    </Button>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>🚫 No hay citas registradas.</p>
      )}
    </Container>
  );
};

export default GestionCitas;