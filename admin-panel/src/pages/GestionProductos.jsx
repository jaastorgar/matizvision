import React, { useState, useEffect } from "react";
import api from "../api/api";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: white;
  min-height: 90vh;
  width: 200%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #333;
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: ${(props) => (props.$danger ? "red" : "#007BFF")};
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #222;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  color: #000;
`;

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: null,
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/adminproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data);
    } catch (error) {
      console.error("❌ Error al obtener productos", error);
      setMensaje("Error al obtener productos.");
    }
  };

  const handleInputChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormulario({ ...formulario, imagen: e.target.files[0] });
  };

  const abrirFormularioCrear = () => {
    setFormulario({
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen: null,
    });
    setEditando(null);
    setModalOpen(true);
  };

  const abrirFormularioEditar = (producto) => {
    setFormulario({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen: null,
    });
    setEditando(producto.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("nombre", formulario.nombre);
      formData.append("descripcion", formulario.descripcion);
      formData.append("precio", formulario.precio);
      formData.append("stock", formulario.stock);
      if (formulario.imagen) {
        formData.append("imagen", formulario.imagen);
      }

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
        setMensaje("✅ Producto agregado.");
      }

      fetchProductos();
      setModalOpen(false);
    } catch (error) {
      console.error("❌ Error al guardar producto", error);
      setMensaje("Error al guardar producto.");
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/adminproducts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje("✅ Producto eliminado.");
      fetchProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto", error);
      setMensaje("Error al eliminar producto.");
    }
  };

  return (
    <Container>
      <h1>Gestión de Productos</h1>
      {mensaje && <p>{mensaje}</p>}
      <Button onClick={abrirFormularioCrear}>Agregar Producto</Button>

      {modalOpen && (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <h2 style={{ color: "white" }}>
              {editando ? "Editar Producto" : "Agregar Producto"}
            </h2>
            <Input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formulario.nombre}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formulario.descripcion}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formulario.precio}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formulario.stock}
              onChange={handleInputChange}
              required
            />
            <Input type="file" onChange={handleFileChange} />
            <Button type="submit">Guardar</Button>
            <Button type="button" $danger onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
          </Form>
        </FormContainer>
      )}

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
          {productos.map((producto) => (
            <tr key={producto.id}>
              <Td>{producto.id}</Td>
              <Td>{producto.nombre}</Td>
              <Td>{producto.descripcion}</Td>
              <Td>${producto.precio}</Td>
              <Td>{producto.stock}</Td>
              <Td>
                {producto.imagen && (
                  <img
                    src={`http://localhost:5000/uploads/${producto.imagen}`}
                    alt={producto.nombre}
                    width="50"
                  />
                )}
              </Td>
              <Td>
                <Button onClick={() => abrirFormularioEditar(producto)}>
                  Editar
                </Button>
                <Button $danger onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionProductos;