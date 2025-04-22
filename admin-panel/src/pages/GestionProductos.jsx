import React, { useState, useEffect } from "react";
import api from "../api/api";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  padding: 2rem;
  background-color: #f6f9fc;
  min-height: 100vh;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #222;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ error }) => (error ? "#c0392b" : "#27ae60")};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: ${({ danger }) => (danger ? "#e74c3c" : "#3498db")};
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    opacity: 0.9;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 850px;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  padding: 12px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  text-align: center;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 4px;
`;

// Modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: null,
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/adminproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (err) {
      setMensaje("❌ Error al obtener productos.");
    }
  };

  const abrirCrear = () => {
    setEditando(null);
    setFormulario({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen: null,
    });
    setModalOpen(true);
  };

  const abrirEditar = (prod) => {
    setEditando(prod.id);
    setFormulario({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      imagen: null,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormulario({ ...formulario, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.entries(formulario).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (editando) {
        await api.put(`/adminproducts/${editando}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMensaje("✅ Producto actualizado.");
      } else {
        await api.post("/adminproducts", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMensaje("✅ Producto creado.");
      }

      setModalOpen(false);
      obtenerProductos();
    } catch (err) {
      console.error("❌ Error al guardar producto", err);
      setMensaje("❌ Error al guardar producto.");
    }
  };

  const eliminarProducto = async (id) => {
    const confirm = window.confirm("¿Eliminar este producto?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/adminproducts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje("🗑️ Producto eliminado.");
      obtenerProductos();
    } catch (err) {
      console.error("❌ Error al eliminar producto", err);
      setMensaje("❌ Error al eliminar producto.");
    }
  };

  return (
    <Container>
      <Title>📦 Gestión de Productos</Title>
      {mensaje && <Message>{mensaje}</Message>}
      <Actions>
        <Button onClick={abrirCrear}>➕ Agregar Producto</Button>
      </Actions>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th>Precio</Th>
              <Th>Stock</Th>
              <Th>Imagen</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <Td>{p.id}</Td>
                <Td>{p.nombre}</Td>
                <Td>{p.descripcion}</Td>
                <Td>${p.precio}</Td>
                <Td>{p.stock}</Td>
                <Td>
                  {p.imagen && (
                    <Img src={`http://localhost:5000/uploads/${p.imagen}`} alt={p.nombre} />
                  )}
                </Td>
                <Td>
                  <Button onClick={() => abrirEditar(p)}>✏️ Editar</Button>
                  <Button danger onClick={() => eliminarProducto(p.id)}>🗑️ Eliminar</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {modalOpen && (
        <Overlay>
          <Modal>
            <h2>{editando ? "✏️ Editar Producto" : "➕ Nuevo Producto"}</h2>
            <Form onSubmit={handleSubmit}>
              <Input name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre" required />
              <Input name="descripcion" value={formulario.descripcion} onChange={handleChange} placeholder="Descripción" required />
              <Input name="precio" type="number" value={formulario.precio} onChange={handleChange} placeholder="Precio" required />
              <Input name="stock" type="number" value={formulario.stock} onChange={handleChange} placeholder="Stock" required />
              <Input type="file" onChange={handleFile} />
              <Button type="submit">💾 Guardar</Button>
              <Button type="button" danger onClick={() => setModalOpen(false)}>Cancelar</Button>
            </Form>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default GestionProductos;