import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // 🔗 Conectamos directamente con la API
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: white;
  min-height: 80vh; /* Ahora ocupa toda la pantalla */
  width: 212%; /* Se ajusta al 100% del contenedor */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Se alinea desde arriba */
`;

const TableWrapper = styled.div`
  width: 90%;
  max-width: 80%; /* Ajusta el ancho */
  overflow-x: auto;
  background-color: #1a1a2e; /* Color de fondo */
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.2);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  background-color: #1a1a2e;
  padding: 12px;
  text-align: left;
  color: white;
  position: sticky;
  top: 0;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid gray;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Más espacio entre botones */
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.$danger ? "red" : props.$warning ? "orange" : "#00ffff"};
  color: black;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const GestionUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Error al cargar usuarios. No autorizado.");
        console.error("❌ Error al obtener usuarios:", err);
      }
      setLoading(false);
    };

    fetchUsuarios();
  }, []);

  const handleVerUsuario = (id) => {
    navigate(`/usuarios/${id}`);
  };

  const handleEliminarUsuario = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (!confirmacion) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑 Usuario eliminado correctamente.");
      setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
      alert("⚠ No se pudo eliminar el usuario.");
    }
  };

  return (
    <Container>
      <h2>👤 Gestión de Usuarios</h2>

      {loading ? (
        <p>🔄 Cargando usuarios...</p>
      ) : error ? (
        <p style={{ color: "red" }}>⚠️ {error}</p>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Rol</Th>
                <Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <Td>{usuario.id}</Td>
                    <Td>{usuario.nombre}</Td>
                    <Td>{usuario.email}</Td>
                    <Td>{usuario.rol}</Td>
                    <Td>
                      <ButtonContainer>
                        <Button onClick={() => handleVerUsuario(usuario.id)}>
                          👁️ Ver
                        </Button>
                        <Button
                          $danger
                          onClick={() => handleEliminarUsuario(usuario.id)}
                        >
                          🗑 Eliminar
                        </Button>
                      </ButtonContainer>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    ⚠️ No hay usuarios registrados.
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};

export default GestionUsuarios;