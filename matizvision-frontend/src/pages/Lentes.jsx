import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Lentes() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/products");
        setProductos(response.data);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="lentes-hero">
        <div className="lentes-overlay" />
        <div className="lentes-hero-content">
          <h1>Explora nuestra colección de lentes</h1>
          <p>Estilo y visión para todos los días</p>
          <input
            type="text"
            placeholder="Buscar por nombre o estilo"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      <div className="lentes-main">
        <aside className={`lentes-sidebar ${mostrarFiltros ? "activo" : ""}`}>
          <h3>Filtros</h3>
          <label><input type="checkbox" /> Lentes de Sol</label>
          <label><input type="checkbox" /> Lentes Recetados</label>
          <label><input type="checkbox" /> Hombre</label>
          <label><input type="checkbox" /> Mujer</label>
        </aside>

        <section className="lentes-productos">
          <div className="lentes-toggle" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
            {mostrarFiltros ? "✖ Ocultar filtros" : "🔍 Mostrar filtros"}
          </div>

          <div className="lentes-grid">
            {productosFiltrados.length === 0 ? (
              <p className="lentes-vacio">No se encontraron productos.</p>
            ) : (
              productosFiltrados.map((producto) => (
                <div key={producto.id} className="lentes-card">
                  <Link to={`/producto/${producto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={`http://localhost:5000/uploads/${producto.imagen}`}
                      alt={producto.nombre}
                    />
                    <h4>{producto.nombre}</h4>
                    <p className="precio">${producto.precio}</p>
                    <p className="ver-mas">Ver más ➜</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />

      {/* Estilos CSS embebidos */}
      <style>{`
        .lentes-hero {
          background: url('https://images.unsplash.com/photo-1504196606672-aef5c9cefc92') center/cover no-repeat;
          height: 60vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lentes-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .lentes-hero-content {
          color: white;
          text-align: center;
          z-index: 2;
        }

        .lentes-hero-content h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .lentes-hero-content p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .lentes-hero-content input {
          padding: 0.6rem 1rem;
          width: 80%;
          max-width: 400px;
          border-radius: 8px;
          border: none;
        }

        .lentes-main {
          display: flex;
          padding: 2rem;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .lentes-sidebar {
          min-width: 200px;
          background: #f1f1f1;
          padding: 1rem;
          border-radius: 10px;
          display: none;
        }

        .lentes-sidebar.activo {
          display: block;
        }

        .lentes-sidebar h3 {
          margin-bottom: 1rem;
        }

        .lentes-sidebar label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .lentes-productos {
          flex: 1;
        }

        .lentes-toggle {
          cursor: pointer;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .lentes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .lentes-card {
          background: #fff;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s;
        }

        .lentes-card:hover {
          transform: translateY(-5px);
        }

        .lentes-card img {
          max-width: 100%;
          border-radius: 8px;
          height: 180px;
          object-fit: cover;
        }

        .lentes-card h4 {
          margin: 0.8rem 0 0.3rem;
        }

        .precio {
          color: #009688;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .ver-mas {
          font-size: 0.9rem;
          color: #2e7d32;
          font-weight: bold;
        }

        .lentes-vacio {
          font-style: italic;
          text-align: center;
          color: #777;
        }

        @media (max-width: 768px) {
          .lentes-main {
            flex-direction: column;
          }

          .lentes-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default Lentes;