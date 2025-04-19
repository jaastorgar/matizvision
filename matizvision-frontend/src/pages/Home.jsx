import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="home-wrapper">
      <Navbar />

      {/* Hero principal */}
      <section className="hero">
        <div className="hero-content">
          <h1>Óptica Matiz Vision</h1>
          <p>Tu mirada, nuestro compromiso. Calidad visual para toda la vida.</p>
          <Link to="/lentes">
            <button className="btn-hero">Explorar Catálogo</button>
          </Link>
        </div>
      </section>

      {/* ¿Quiénes Somos? */}
      <section className="seccion quien-somos">
        <h2>¿Quiénes somos?</h2>
        <p>
          En <strong>Matiz Vision</strong> nos dedicamos a mejorar tu calidad de vida
          a través de una atención óptica personalizada, con productos de última tecnología
          y un enfoque humano en cada consulta.
        </p>
      </section>

      {/* Visión y Misión */}
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

      {/* Productos */}
      <section className="seccion destacados">
        <h2>🔥 Productos Destacados</h2>
        <div className="productos-grid">
          {productos.slice(0, 4).map((p) => (
            <div key={p.id} className="producto-card">
              <img src={`http://localhost:5000/uploads/${p.imagen}`} alt={p.nombre} />
              <h4>{p.nombre}</h4>
              <p>${p.precio}</p>
              <button>Ver más</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="seccion testimonios">
        <h2>💬 Lo que dicen nuestros clientes</h2>
        <Slider {...sliderSettings}>
          {testimonios.map((t) => (
            <div key={t.id} className="testimonio-card">
              <h4>{t.nombre}</h4>
              <p>"{t.comentario}"</p>
            </div>
          ))}
        </Slider>
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

      {/* Estilos integrados */}
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

        .destacados .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .producto-card {
          background: #fff;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          text-align: center;
        }

        .producto-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 8px;
        }

        .producto-card button {
          margin-top: 10px;
          background: #008000;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
        }

        .testimonios {
          background: #ffffff;
        }

        .testimonio-card {
          background: #f3f3f3;
          padding: 20px;
          margin: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
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
          .mision-vision {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;