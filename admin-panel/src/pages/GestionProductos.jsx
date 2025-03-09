import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api/api";

// Estilos del contenedor principal
const Container = styled.div`
  padding: 20px;
  color: white;
  min-height: 90vh;
  width: 345%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #0a0a1f;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #00ffff;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
  margin-right: 10px;
  color: black;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$danger ? "#ff0000" : "#00ffff")};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin: 5px;

  &:hover {
    background-color: ${(props) => (props.$danger ? "#cc0000" : "#009999")};
  }
`;

const TableContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  background: #121212;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.thead`
  background-color: #00ffff;
  color: black;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #444;
  &:hover {
    background-color: #222;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #444;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.$show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #222;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
`;

const Message = styled.p`
  color: ${(props) => (props.$error ? "red" : "green")};
  font-weight: bold;
  margin-top: 10px;
`;

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    imagen: null,
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No autorizado");
      const response = await api.get("/adminproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = Array.isArray(productos)
    ? productos.filter((producto) =>
        producto.nombre
          ? producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
          : false
      )
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewProduct({ ...newProduct, imagen: e.target.files[0] });
  };

  const handleAgregarProducto = async () => {
    if (!newProduct.nombre || !newProduct.descripcion || !newProduct.precio || !newProduct.stock || !newProduct.categoria || !newProduct.imagen) {
      setMessage({ text: "Todos los campos son obligatorios.", $error: true });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", newProduct.nombre);
    formData.append("descripcion", newProduct.descripcion);
    formData.append("precio", newProduct.precio);
    formData.append("stock", newProduct.stock);
    formData.append("categoria", newProduct.categoria);
    formData.append("imagen", newProduct.imagen);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No autorizado");
      await api.post("/adminproducts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({ text: "Producto agregado con éxito!", $error: false });
      setModalOpen(false);
      fetchProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setMessage({ text: "Error al agregar producto.", $error: true });
    }
  };

  return (
    <Container>
      <Title>📦 Gestión de Productos</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={handleBuscar}
        />
        <Button onClick={() => setModalOpen(true)}>➕ Agregar Producto</Button>
      </SearchContainer>

      <ModalOverlay $show={modalOpen}>
        <ModalContent>
          <h2>Agregar Producto</h2>
          <Input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} />
          <Input type="text" name="descripcion" placeholder="Descripción" onChange={handleInputChange} />
          <Input type="number" name="precio" placeholder="Precio" onChange={handleInputChange} />
          <Input type="number" name="stock" placeholder="Stock" onChange={handleInputChange} />
          <Input type="text" name="categoria" placeholder="Categoría" onChange={handleInputChange} />
          <Input type="file" onChange={handleFileChange} />
          {message && <Message $error={message.$error}>{message.text}</Message>}
          <Button onClick={handleAgregarProducto}>Guardar</Button>
          <Button $danger onClick={() => setModalOpen(false)}>Cancelar</Button>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default GestionProductos;