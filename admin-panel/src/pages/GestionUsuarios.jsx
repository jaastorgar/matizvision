import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/api";

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
    verificarRol();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const verificarRol = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEsAdmin(res.data.rol === "admin");
    } catch (err) {
      console.error("Error al verificar rol:", err);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      obtenerUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const clientes = usuariosFiltrados.filter((u) => u.rol === "cliente");
  const trabajadores = usuariosFiltrados.filter((u) => u.rol === "trabajador");
  const admins = usuariosFiltrados.filter((u) => u.rol === "admin");

  return (
    <Wrapper>
      <Header>
        <h1>👥 Panel de Usuarios</h1>
        <SearchBar
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Header>

      <h2>🟦 Clientes</h2>
      <Grid>
        {clientes.map((user) => (
          <Card key={user.id}>
            <Avatar>{user.nombre.charAt(0).toUpperCase()}</Avatar>
            <Info>
              <h3>{user.nombre}</h3>
              <p>RUT: {user.rut}-{user.dv}</p>
              <RolTag $rol={user.rol}>{user.rol}</RolTag>
            </Info>
            <Buttons>
              <DetailBtn onClick={() => setUsuarioActivo(user)}>👁 Detalle</DetailBtn>
              <DeleteBtn onClick={() => eliminarUsuario(user.id)}>🗑 Eliminar</DeleteBtn>
            </Buttons>
          </Card>
        ))}
      </Grid>

      <h2>🟨 Trabajadores</h2>
      <Grid>
        {trabajadores.map((user) => (
          <Card key={user.id}>
            <Avatar>{user.nombre.charAt(0).toUpperCase()}</Avatar>
            <Info>
              <h3>{user.nombre}</h3>
              <p>RUT: {user.rut}-{user.dv}</p>
              <RolTag $rol={user.rol}>{user.rol}</RolTag>
            </Info>
            <Buttons>
              <DetailBtn onClick={() => setUsuarioActivo(user)}>👁 Detalle</DetailBtn>
              <DeleteBtn onClick={() => eliminarUsuario(user.id)}>🗑 Eliminar</DeleteBtn>
            </Buttons>
          </Card>
        ))}
      </Grid>

      <h2>🟥 Administradores</h2>
      <Grid>
        {admins.map((user) => (
          <Card key={user.id}>
            <Avatar>{user.nombre.charAt(0).toUpperCase()}</Avatar>
            <Info>
              <h3>{user.nombre}</h3>
              <p>RUT: {user.rut}-{user.dv}</p>
              <RolTag $rol={user.rol}>{user.rol}</RolTag>
            </Info>
            <Buttons>
              <DetailBtn onClick={() => setUsuarioActivo(user)}>👁 Detalle</DetailBtn>
              <DeleteBtn onClick={() => eliminarUsuario(user.id)}>🗑 Eliminar</DeleteBtn>
            </Buttons>
          </Card>
        ))}
      </Grid>

      {usuarioActivo && (
        <Modal>
          <ModalContent>
            <h2>📄 Detalle de Usuario</h2>
            <label>Nombre:</label>
            <Input
              value={usuarioActivo.nombre}
              onChange={(e) => {
                if (esAdmin) {
                  setUsuarioActivo({ ...usuarioActivo, nombre: e.target.value });
                }
              }}
              disabled={!esAdmin}
            />
            <label>Email:</label>
            <Input
              value={usuarioActivo.email}
              onChange={(e) => {
                if (esAdmin) {
                  setUsuarioActivo({ ...usuarioActivo, email: e.target.value });
                }
              }}
              disabled={!esAdmin}
            />
            <label>Teléfono:</label>
            <Input
              value={usuarioActivo.telefono}
              onChange={(e) => {
                if (esAdmin) {
                  setUsuarioActivo({ ...usuarioActivo, telefono: e.target.value });
                }
              }}
              disabled={!esAdmin}
            />
            <label>RUT:</label>
            <Input value={`${usuarioActivo.rut}-${usuarioActivo.dv}`} disabled />

            <label>Rol:</label>
            <Input value={usuarioActivo.rol} disabled />

            <ModalButtons>
              <CloseBtn onClick={() => setUsuarioActivo(null)}>Cerrar</CloseBtn>
              {esAdmin && (
                <SaveBtn
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      await api.put(`/usuarios/${usuarioActivo.id}`, usuarioActivo, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setUsuarioActivo(null);
                      obtenerUsuarios();
                    } catch (err) {
                      console.error("Error al actualizar usuario:", err);
                    }
                  }}
                >
                  💾 Guardar
                </SaveBtn>
              )}
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Wrapper>
  );
}

// -------------------- ESTILOS --------------------

const Wrapper = styled.div`
  padding: 2rem;
  background: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: none;
  background: #1e293b;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.div`
  background: #0ea5e9;
  color: white;
  font-size: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Info = styled.div`
  margin-top: 1rem;
  p {
    font-size: 0.9rem;
    color: #cbd5e1;
    margin: 0.3rem 0;
  }
`;

const RolTag = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
  color: white;
  background: ${({ $rol }) =>
    $rol === "admin" ? "#10b981" : $rol === "trabajador" ? "#f59e0b" : "#3b82f6"};
`;

const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const DeleteBtn = styled.button`
  background: #ef4444;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  border-radius: 8px;
`;

const DetailBtn = styled.button`
  background: #3b82f6;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: bold;
  border-radius: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background: #334155;
  border: none;
  padding: 0.7rem;
  border-radius: 8px;
  color: white;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CloseBtn = styled.button`
  background: gray;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  border-radius: 8px;
`;

const SaveBtn = styled.button`
  background: #10b981;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
`;