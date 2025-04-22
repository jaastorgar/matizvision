import { useEffect, useState } from "react";
import api from "../api/api";
import styled from "styled-components";

// 🌟 Estilos modernos
const Container = styled.div`
  min-height: 100vh;
  padding: 50px 20px;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const TableWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #34495e;
  color: white;
`;

const Th = styled.th`
  padding: 16px;
  font-weight: bold;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f0f4f8;
  }
`;

const Td = styled.td`
  padding: 14px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  background-color: ${({ type }) =>
    type === "confirmar" ? "#27ae60" :
    type === "reagendar" ? "#2980b9" :
    type === "rechazar" ? "#e74c3c" :
    type === "eliminar" ? "#7f8c8d" : "#bdc3c7"};

  &:hover {
    opacity: 0.85;
    transform: scale(1.03);
    transition: 0.2s;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${({ error }) => (error ? "#e74c3c" : "#2ecc71")};
  margin-bottom: 15px;
  font-weight: 600;
`;

const GestionCitas = () => {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerCitas();
  }, []);

  const obtenerCitas = async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/admincitas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCitas(res.data || []);
    } catch (err) {
      setError("❌ Error al obtener citas.");
    }
    setCargando(false);
  };

  const actualizarCita = async (id, estado) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/admincitas/${id}`, { estado }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje(`✅ Cita ${id} actualizada a ${estado}`);
      obtenerCitas();
    } catch (err) {
      setError("⚠️ Error al actualizar cita.");
    }
  };

  const eliminarCita = async (id) => {
    const confirmar = window.confirm(`¿Estás seguro de eliminar la cita ${id}?`);
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admincitas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje(`🗑️ Cita ${id} eliminada correctamente.`);
      obtenerCitas();
    } catch (err) {
      setError("❌ No se pudo eliminar la cita.");
    }
  };

  return (
    <Container>
      <Title>📅 Gestión de Citas</Title>

      {mensaje && <Message>{mensaje}</Message>}
      {error && <Message error>{error}</Message>}

      {cargando ? (
        <Message>Cargando citas...</Message>
      ) : citas.length === 0 ? (
        <Message>🚫 No hay citas disponibles.</Message>
      ) : (
        <TableWrapper>
          <Table>
            <Thead>
              <tr>
                <Th>ID</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
                <Th>Cliente</Th>
                <Th>Teléfono</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </tr>
            </Thead>
            <tbody>
              {citas.map((cita) => {
                const fechaCita = new Date(cita.fecha);
                return (
                  <Tr key={cita.id}>
                    <Td>{cita.id}</Td>
                    <Td>{fechaCita.toLocaleDateString()}</Td>
                    <Td>{fechaCita.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false })}</Td>
                    <Td>{cita.clienteNombre || "Sin nombre"}</Td>
                    <Td>{cita.clienteTelefono || "Sin teléfono"}</Td>
                    <Td>{cita.estado}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button type="confirmar" onClick={() => actualizarCita(cita.id, "confirmada")}>Confirmar</Button>
                        <Button type="reagendar" onClick={() => actualizarCita(cita.id, "reprogramada")}>Reprogramar</Button>
                        <Button type="rechazar" onClick={() => actualizarCita(cita.id, "rechazada")}>Rechazar</Button>
                        <Button type="eliminar" onClick={() => eliminarCita(cita.id)}>Eliminar</Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};

export default GestionCitas;