import { useEffect, useState } from "react";
import api from "../api/api"; // 🔗 Conectamos directamente con la API
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
  background-color: #1a1a2e;
  padding: 10px;
  text-align: left;
  color: white;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid gray;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$danger ? "red" : "#00ffff")}; /* ✅ Usamos $ para evitar que se pase al DOM */
  color: black;
  border: none;
  padding: 8px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
`;

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Obtener usuarios con autenticación
  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // 🔑 Obtener token del localStorage
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

  // ✅ Actualizar usuario por ID
  const handleActualizar = async (id, nuevosDatos) => {
    try {
      console.log(`✏ Actualizando usuario con ID: ${id}`);
      const token = localStorage.getItem("token");
      const response = await api.put(`/usuarios/${id}`, nuevosDatos, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === id ? { ...usuario, ...response.data } : usuario
        )
      );
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
    }
  };

  // ✅ Eliminar usuario por ID
  const handleEliminar = async (id) => {
    try {
      console.log(`🗑 Eliminando usuario con ID: ${id}`);
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
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
                    <Button onClick={() => handleActualizar(usuario.id, { nombre: "Nuevo Nombre" })}>
                      ✏️ Editar
                    </Button>
                    <Button $danger onClick={() => handleEliminar(usuario.id)}>🗑 Eliminar</Button> {/* ✅ Corregido */}
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
      )}
    </Container>
  );
};

export default GestionUsuarios;