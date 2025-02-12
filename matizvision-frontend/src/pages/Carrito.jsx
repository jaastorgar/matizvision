import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoStorage);
  }, []);

  // Aumentar cantidad de producto
  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += 1;
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Disminuir cantidad de producto
  const disminuirCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } else {
      eliminarProducto(index);
    }
  };

  // Eliminar producto del carrito
  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Calcular total de la compra
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3", color: "#000000", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      <header style={{ textAlign: "center", padding: "40px", backgroundColor: "#008000", color: "#ffffff" }}>
        <h1>🛒 Tu Carrito de Compras</h1>
      </header>

      <section style={{ padding: "40px", textAlign: "center" }}>
        {carrito.length > 0 ? (
          <div>
            {carrito.map((producto, index) => (
              <div key={index} style={cardStyle}>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: "100px", borderRadius: "8px" }} />
                <h3 style={{ color: "#008000" }}>{producto.nombre}</h3>
                <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#ff9900" }}>${producto.precio}</p>
                
                {/* Controles de cantidad */}
                <div>
                  <button onClick={() => disminuirCantidad(index)} style={cantidadBoton}>➖</button>
                  <span style={{ margin: "0 10px", fontSize: "1.2em" }}>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(index)} style={cantidadBoton}>➕</button>
                </div>

                <p style={{ fontSize: "1.2em", fontWeight: "bold", marginTop: "10px" }}>
                  Total: ${(producto.precio * producto.cantidad).toFixed(2)}
                </p>

                <button onClick={() => eliminarProducto(index)} style={buttonEliminar}>❌ Quitar</button>
              </div>
            ))}

            {/* Total de la compra */}
            <h2 style={{ marginTop: "20px", color: "#008000" }}>Total: ${calcularTotal()}</h2>

            {/* Botón de Pago */}
            <button style={buttonComprar}>💳 Proceder al Pago</button>
          </div>
        ) : (
          <p style={{ fontSize: "1.5em", color: "#000000" }}>Tu carrito está vacío</p>
        )}
      </section>

      {/* Volver a la tienda */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/lentes" style={linkStyle}>⬅️ Volver a la Tienda</Link>
      </div>

      <Footer />
    </div>
  );
};

// **Estilos Mejorados**
const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
};

const cantidadBoton = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px"
};

const buttonEliminar = {
  backgroundColor: "#ff0000",
  color: "#ffffff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px"
};

const buttonComprar = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "20px"
};

const linkStyle = {
  color: "#ffffff",
  backgroundColor: "#008000",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Carrito;