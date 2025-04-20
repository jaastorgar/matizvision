import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem("carrito")) || []);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProducto(res.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  const agregarAlCarrito = () => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new CustomEvent("actualizarCarrito", { detail: nuevoCarrito.length }));
  };

  if (!producto) return <p style={{ textAlign: "center" }}>Cargando producto...</p>;

  return (
    <>
      <Navbar />

      <div className="detalle-container">
        <div className="detalle-img">
          <img src={`http://localhost:5000/uploads/${producto.imagen}`} alt={producto.nombre} />
        </div>
        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p className="precio">${producto.precio}</p>
          <p className="descripcion">{producto.descripcion}</p>
          <p className="stock">Stock disponible: <strong>{producto.stock}</strong></p>
          <button className="btn-carrito" onClick={agregarAlCarrito}>
            🛒 Añadir al carrito
          </button>
          <button className="btn-volver" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        </div>
      </div>

      <Footer />

      {/* Estilos embebidos */}
      <style>{`
        .detalle-container {
          display: flex;
          flex-wrap: wrap;
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: auto;
          gap: 2rem;
        }

        .detalle-img {
          flex: 1;
          min-width: 300px;
        }

        .detalle-img img {
          width: 100%;
          max-height: 500px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .detalle-info {
          flex: 1;
          min-width: 280px;
        }

        .detalle-info h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .precio {
          color: #009688;
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .descripcion {
          font-size: 1rem;
          color: #444;
          margin-bottom: 1rem;
        }

        .stock {
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .btn-carrito {
          padding: 10px 20px;
          background-color: #2e7d32;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin-right: 1rem;
        }

        .btn-carrito:hover {
          background-color: #1b5e20;
        }

        .btn-volver {
          padding: 8px 16px;
          background-color: transparent;
          color: #444;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn-volver:hover {
          background-color: #f1f1f1;
        }

        @media (max-width: 768px) {
          .detalle-container {
            flex-direction: column;
            text-align: center;
          }

          .btn-carrito, .btn-volver {
            width: 100%;
            margin: 0.5rem 0;
          }

          .detalle-info {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ProductoDetalle;