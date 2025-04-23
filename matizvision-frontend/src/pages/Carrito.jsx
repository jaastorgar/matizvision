import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CarritoContainer = styled.div`
  padding: 40px;
`;

const ProductoCard = styled.div`
  background: #f1f5f9;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div``;

const CantidadInput = styled.input`
  width: 60px;
  padding: 5px;
  text-align: center;
  margin-left: 10px;
`;

const EliminarBtn = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  font-size: 20px;
`;

const PagarBtn = styled.button`
  background-color: #0d9488;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 1rem;
`;

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(guardado);
  }, []);

  const actualizarCantidad = async (id, cantidad) => {
    const producto = await api.get(`/productos/${id}`);
    if (cantidad > producto.data.stock) {
      alert("Stock insuficiente.");
      return;
    }

    const actualizado = carrito.map((item) =>
      item.id === id ? { ...item, cantidad } : item
    );
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter((item) => item.id !== id);
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const procesarPago = async () => {
    // Simulación de pago y reducción de stock en el backend
    try {
      for (let item of carrito) {
        await api.put(`/productos/${item.id}/reducir-stock`, {
          cantidad: item.cantidad,
        });
      }
      localStorage.removeItem("carrito");
      alert("Pago procesado y stock actualizado.");
      setCarrito([]);
    } catch (error) {
      alert("Hubo un error al procesar el pago.");
    }
  };

  return (
  <>
    <Navbar />
      <CarritoContainer>
        <h2>🛒 Mi Carrito</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            {carrito.map((item) => (
              <ProductoCard key={item.id}>
                <Info>
                  <h4>{item.nombre}</h4>
                  <p>
                    Precio: ${item.precio} | Cantidad:
                    <CantidadInput
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        actualizarCantidad(item.id, Number(e.target.value))
                      }
                    />
                  </p>
                </Info>
                <EliminarBtn onClick={() => eliminarProducto(item.id)}>
                  <FaTrashAlt />
                </EliminarBtn>
              </ProductoCard>
            ))}
            <h3>Total: ${total.toLocaleString()} CLP</h3>
            <PagarBtn onClick={procesarPago}>Proceder al pago</PagarBtn>
          </>
        )}
      </CarritoContainer>
    <Footer />
  </>
  );
};

export default Carrito;