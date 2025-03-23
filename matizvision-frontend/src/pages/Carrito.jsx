import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

    // Asegura que cada producto tenga una cantidad mínima de 1
    const carritoConCantidad = carritoStorage.map(producto => ({
      ...producto,
      cantidad: producto.cantidad || 1,
    }));

    setCarrito(carritoConCantidad);
  }, []);

  const aumentarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += 1;
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

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

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(0);
  };

  return (
    <div style={pageStyle}>
      <Navbar />

      <header style={headerStyle}>
        <h1>🛒 Tu Carrito de Compras</h1>
      </header>

      <section style={sectionStyle}>
        {carrito.length > 0 ? (
          <div>
            {carrito.map((producto, index) => (
              <div key={index} style={cardStyle}>
                <img
                  src={`http://localhost:5000/uploads/${producto.imagen}`}
                  alt={producto.nombre}
                  style={imageStyle}
                />
                <h3 style={titleStyle}>{producto.nombre}</h3>
                <p style={priceStyle}>${producto.precio}</p>

                <div>
                  <button onClick={() => disminuirCantidad(index)} style={cantidadBoton}>➖</button>
                  <span style={cantidadText}>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(index)} style={cantidadBoton}>➕</button>
                </div>

                <p style={totalPorProducto}>Total: ${(producto.precio * producto.cantidad).toFixed(0)}</p>
                <button onClick={() => eliminarProducto(index)} style={buttonEliminar}>❌ Quitar</button>
              </div>
            ))}

            <h2 style={{ marginTop: "20px", color: "#008000" }}>Total: ${calcularTotal()}</h2>
            <button style={buttonComprar}>💳 Proceder al Pago</button>
          </div>
        ) : (
          <p style={{ fontSize: "1.5em", color: "#000000" }}>Tu carrito está vacío</p>
        )}
      </section>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/lentes" style={linkStyle}>⬅️ Volver a la Tienda</Link>
      </div>

      <Footer />
    </div>
  );
};

// 🔧 Estilos
const pageStyle = {
  backgroundColor: "#D3D3D3",
  color: "#000000",
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
};

const headerStyle = {
  textAlign: "center",
  padding: "40px",
  backgroundColor: "#008000",
  color: "#ffffff",
};

const sectionStyle = {
  padding: "40px",
  textAlign: "center",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
};

const imageStyle = {
  width: "100px",
  borderRadius: "8px",
};

const titleStyle = {
  color: "#008000",
};

const priceStyle = {
  fontSize: "1.2em",
  fontWeight: "bold",
  color: "#ff9900",
};

const cantidadBoton = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "5px",
};

const cantidadText = {
  margin: "0 10px",
  fontSize: "1.2em",
};

const totalPorProducto = {
  fontSize: "1.2em",
  fontWeight: "bold",
  marginTop: "10px",
};

const buttonEliminar = {
  backgroundColor: "#ff0000",
  color: "#ffffff",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const buttonComprar = {
  backgroundColor: "#008000",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "20px",
};

const linkStyle = {
  color: "#ffffff",
  backgroundColor: "#008000",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Carrito;