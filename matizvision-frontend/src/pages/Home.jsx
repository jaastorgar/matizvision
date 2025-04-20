import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("❌ Productos:", err));

    api.get("/testimonios")
      .then((res) => setTestimonios(res.data))
      .catch((err) => console.error("❌ Testimonios:", err));
  }, []);

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Óptica Matiz Vision</h1>
          <p>Tu mirada, nuestro compromiso. Calidad visual para toda la vida.</p>
          <Link to="/lentes">
            <button className="btn-hero">Explorar Catálogo</button>
          </Link>
        </div>
      </section>

      {/* Quienes somos */}
      <section className="seccion quien-somos">
        <h2>¿Quiénes somos?</h2>
        <p>
          En <strong>Matiz Vision</strong> nos dedicamos a mejorar tu calidad de vida
          a través de una atención óptica personalizada, con productos de última tecnología
          y un enfoque humano en cada consulta.
        </p>
      </section>

      {/* Misión y Visión */}
      <section className="seccion mision-vision">
        <div className="card mv">
          <h3>🌟 Visión</h3>
          <p>
            Ser líderes en soluciones visuales accesibles e innovadoras, mejorando la visión
            y confianza de cada persona que nos visita.
          </p>
        </div>
        <div className="card mv">
          <h3>🎯 Misión</h3>
          <p>
            Brindar atención óptica integral, con calidez, precisión profesional y productos
            de alta calidad, asegurando la satisfacción total de nuestros clientes.
          </p>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="seccion destacados">
        <h2>🔥 Productos Destacados</h2>
        <div className="productos-grid-centrado">
          {productos.slice(0, 4).map((p) => (
            <div key={p.id} className="card-producto">
              <img src={`http://localhost:5000/uploads/${p.imagen}`} alt={p.nombre} />
              <div className="card-info">
                <h4>{p.nombre}</h4>
                <p className="precio">${p.precio}</p>
                <Link to={`/producto/${p.id}`} className="ver-link">Ver más →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios - NUEVO CARRUSEL */}
      <section className="seccion testimonios">
        <h2>💬 Lo que dicen nuestros clientes</h2>
        <div className="testimonios-carrusel">
          <div className="carrusel-track">
            {[...testimonios, ...testimonios].map((t, i) => (
              <div key={i} className="testimonio-slide">
                <div className="testimonio-card">
                  <h4>{t.nombre}</h4>
                  <p>"{t.comentario}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/dejar-testimonio">
          <button className="btn-testimonio">📝 Dejar Testimonio</button>
        </Link>
      </section>

      {/* Garantías */}
      <section className="seccion garantias">
        <h2>🛡️ Nuestra Garantía</h2>
        <div className="garantias-grid">
          <div className="card">✅ Calidad Certificada</div>
          <div className="card">🔄 Cambios en 30 días</div>
          <div className="card">💳 Pago Seguro</div>
          <div className="card">👓 Ajuste Perfecto</div>
        </div>
      </section>

      <Footer />

      <style>{`
        .home-wrapper {
          font-family: 'Poppins', sans-serif;
          background: #f9f9f9;
          color: #222;
        }

        .hero {
          background: url('https://images.unsplash.com/photo-1605460375648-278bcbd579a6') center/cover no-repeat;
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: white;
          text-align: center;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .btn-hero {
          background: #008000;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1em;
          cursor: pointer;
        }

        .seccion {
          padding: 60px 20px;
          text-align: center;
        }

        .quien-somos p {
          max-width: 700px;
          margin: auto;
          font-size: 1.1rem;
          color: #444;
        }

        .mision-vision {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
        }

        .mv {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          width: 300px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .productos-grid-centrado {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: auto;
        }

        .card-producto {
          background: #fff;
          width: 250px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }

        .card-producto:hover {
          transform: translateY(-6px);
        }

        .card-producto img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .card-info {
          padding: 1rem;
          text-align: center;
        }

        .card-info h4 {
          margin-bottom: 0.5rem;
        }

        .card-info .precio {
          color: #009688;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .ver-link {
          display: inline-block;
          margin-top: 6px;
          font-weight: bold;
          color: #2e7d32;
          text-decoration: none;
        }

        .ver-link:hover {
          text-decoration: underline;
        }

        .testimonios-carrusel {
          overflow: hidden;
          width: 100%;
          max-width: 1000px;
          margin: auto;
          position: relative;
        }

        .carrusel-track {
          display: flex;
          animation: slide 20s linear infinite;
          width: max-content;
        }

        .testimonio-slide {
          flex: 0 0 300px;
          margin: 0 10px;
        }

        .testimonio-card {
          background: #f3f3f3;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          text-align: center;
          height: 100%;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .btn-testimonio {
          background: #2d8f2d;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          margin-top: 20px;
          cursor: pointer;
        }

        .garantias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .garantias-grid .card {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .productos-grid-centrado {
            justify-content: center;
          }

          .mision-vision {
            flex-direction: column;
          }

          .testimonio-slide {
            flex: 0 0 80%;
          }

          .carrusel-track {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;