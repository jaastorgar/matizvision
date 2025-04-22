import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api/api";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rol: "cliente",
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/usuarios", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ nombre: "", email: "", telefono: "", rol: "cliente" });
      setModalOpen(false);
      cargarUsuarios();
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <PageWrapper>
      <Header>
        <Title>👥 Gestión de Usuarios</Title>
        <TopControls>
          <SearchInput
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <MainButton onClick={() => setModalOpen(true)}>
            ➕ Agregar Usuario
          </MainButton>
        </TopControls>
      </Header>

      <UserGrid>
        {usuariosFiltrados.map((u) => (
          <UserCard key={u.id}>
            <UserInfo>
              <strong>{u.nombre}</strong>
              <small>{u.email}</small>
              <span>{u.telefono}</span>
              <RoleTag>{u.rol}</RoleTag>
            </UserInfo>
            <ButtonGroup>
              <SmallButton $danger onClick={() => eliminarUsuario(u.id)}>
                Eliminar
              </SmallButton>
            </ButtonGroup>
          </UserCard>
        ))}
      </UserGrid>

      {modalOpen && (
        <ModalOverlay>
          <Modal>
            <form onSubmit={handleCrear}>
              <h2>Nuevo Usuario</h2>
              <input
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
              <input
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              >
                <option value="cliente">Cliente</option>
                <option value="trabajador">Trabajador</option>
                <option value="administrador">Administrador</option>
              </select>
              <ModalActions>
                <MainButton type="submit">Guardar</MainButton>
                <SmallButton onClick={() => setModalOpen(false)}>Cancelar</SmallButton>
              </ModalActions>
            </form>
          </Modal>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}

// ESTILOS

const PageWrapper = styled.div`
  padding: 2rem;
  background-color: #f4f6f8;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #222;
`;

const TopControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const MainButton = styled.button`
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const SmallButton = styled.button`
  background-color: ${({ $danger }) => ($danger ? "#dc3545" : "#6c757d")};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const RoleTag = styled.span`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #555;
  background: #e7f1ff;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  width: fit-content;
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;