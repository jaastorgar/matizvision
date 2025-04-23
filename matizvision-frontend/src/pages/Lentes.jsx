import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Banner = styled.section`
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1606813902499-17377f28b9c4");
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BannerOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 50px 20px;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 260px;
`;

const Select = styled.select`
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Grid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const ProductImage = styled.div`
  height: 200px;
  background: ${({ src }) => `url(${src}) center / cover no-repeat`};
`;

const Info = styled.div`
  padding: 20px;
  text-align: center;
`;

const Name = styled.h3`
  margin-bottom: 10px;
`;

const Price = styled.p`
  color: #0d9488;
  font-weight: bold;
`;

const Stock = styled.p`
  margin: 10px 0;
  color: ${({ agotado }) => (agotado ? "#ef4444" : "#64748b")};
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0d9488")};
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0f766e")};
  }
`;

const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [stockFilter, setStockFilter] = useState("todos");
  const [precioFilter, setPrecioFilter] = useState("todos");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const handleAgregar = (producto) => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find((item) => item.id === producto.id);
    const cantidad = existente ? existente.cantidad + 1 : 1;

    if (cantidad > producto.stock) {
      alert("No hay suficiente stock disponible.");
      return;
    }

    const actualizado = existente
      ? carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad } : p
        )
      : [...carrito, { ...producto, cantidad: 1 }];

    localStorage.setItem("carrito", JSON.stringify(actualizado));
    alert("Producto añadido al carrito.");
  };

  const productosFiltrados = productos.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchStock =
      stockFilter === "todos" ||
      (stockFilter === "disponibles" && p.stock > 0) ||
      (stockFilter === "agotados" && p.stock === 0);
    const matchPrecio =
      precioFilter === "todos" ||
      (precioFilter === "bajo" && p.precio < 20000) ||
      (precioFilter === "medio" && p.precio >= 20000 && p.precio <= 40000) ||
      (precioFilter === "alto" && p.precio > 40000);

    return matchNombre && matchStock && matchPrecio;
  });

  return (
    <>
      <Navbar />
      <Banner>
        <BannerOverlay>
          <Title>Descubre los Lentes Perfectos</Title>
          <Subtitle>
            Filtra por estilo, stock o precio. ¡Encuentra el ideal para ti!
          </Subtitle>
        </BannerOverlay>
      </Banner>

      <Container>
        <Filters>
          <Input
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Select onChange={(e) => setStockFilter(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="disponibles">Disponibles</option>
            <option value="agotados">Agotados</option>
          </Select>
          <Select onChange={(e) => setPrecioFilter(e.target.value)}>
            <option value="todos">Precio</option>
            <option value="bajo">Menos de $20.000</option>
            <option value="medio">$20.000 - $40.000</option>
            <option value="alto">Más de $40.000</option>
          </Select>
        </Filters>

        <Grid>
          {productosFiltrados.map((p) => (
            <Card key={p.id}>
              <ProductImage src={p.imagen || "https://via.placeholder.com/300"} />
              <Info>
                <Name>{p.nombre}</Name>
                <Price>${p.precio.toLocaleString()} CLP</Price>
                <Stock agotado={p.stock === 0}>
                  {p.stock === 0 ? "Producto agotado" : `Stock: ${p.stock}`}
                </Stock>
                <Button
                  disabled={p.stock === 0}
                  onClick={() => handleAgregar(p)}
                >
                  {p.stock === 0 ? "Agotado" : "Añadir al carrito"}
                </Button>
              </Info>
            </Card>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Lentes;