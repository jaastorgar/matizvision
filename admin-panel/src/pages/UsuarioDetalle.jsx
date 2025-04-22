import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import styled from "styled-components";

// Estilos
const Wrapper = styled.div`
  padding: 40px;
  background: #f4f6f8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Field = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? "#f0f0f0" : "white")};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${({ danger }) => (danger ? "#e74c3c" : "#3498db")};
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
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
    return (
      <Wrapper>
        <Card>
          <p>🔄 Cargando usuario...</p>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Card>
        <Title>👤 Detalle del Usuario</Title>
        <form onSubmit={handleGuardar}>
          <Field>
            <Label>Nombre</Label>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!editando}
            />
          </Field>
          <Field>
            <Label>Correo electrónico</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editando}
            />
          </Field>
          <Field>
            <Label>Teléfono</Label>
            <Input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              disabled={!editando}
            />
          </Field>
          <Field>
            <Label>Rol</Label>
            <Input
              name="rol"
              value={formData.rol}
              disabled
            />
          </Field>

          <ButtonRow>
            {!editando ? (
              <>
                <Button onClick={handleActualizar}>✏️ Editar</Button>
                <Button danger onClick={handleVolver}>↩️ Volver</Button>
              </>
            ) : (
              <>
                <Button type="submit">💾 Guardar</Button>
                <Button danger onClick={() => setEditando(false)}>Cancelar</Button>
              </>
            )}
          </ButtonRow>
        </form>
      </Card>
    </Wrapper>
  );
};

export default UsuarioDetalle;