import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Asegúrate de que api.js esté configurado correctamente
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a1f;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #1a1a2e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$danger ? "red" : "#00ffff")};
  color: black;
  border: none;
  padding: 12px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const UsuarioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/usuarios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("❌ Error al obtener usuario:", err);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActualizar = () => {
    setEditando(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (JSON.stringify(usuario) === JSON.stringify(formData)) {
      alert("⚠️ No hay cambios para actualizar.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await api.put(`/usuarios/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(formData);
      setEditando(false);
      alert("✅ Usuario actualizado correctamente");
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
    }
  };

  const handleVolver = () => {
    navigate("/gestionusuarios");
  };

  if (!usuario) {
    return <Container><p>🔄 Cargando usuario...</p></Container>;
  }

  return (
    <Container>
      <Form onSubmit={handleGuardar}>
        <h2>👤 Información del Usuario</h2>
        <Label>Nombre:</Label>
        <Input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          disabled={!editando}
        />

        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editando}
        />

        <Label>Teléfono:</Label>
        <Input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          disabled={!editando}
        />

        <Label>Rol:</Label>
        <Input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          disabled
        />

        {!editando ? (
          <Button type="button" onClick={handleActualizar}>
            ✏️ Actualizar
          </Button>
        ) : (
          <>
            <Button type="submit">💾 Guardar</Button>
            <Button type="button" $danger onClick={handleVolver}>
              ↩️ Volver
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default UsuarioDetalle;