import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import api from "../api/axiosConfig";

const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    // Simulación de la llamada a la API (reemplazar con tu lógica real)
    const fetchProductos = async () => {
      try {
        const response = await api.get("/products");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        // Manejar el error adecuadamente (por ejemplo, mostrar un mensaje al usuario)
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    const eventoCarrito = new CustomEvent("actualizarCarrito", {
      detail: nuevoCarrito.length
    });
    window.dispatchEvent(eventoCarrito);
  };

  // --- Estilos ---
  const containerStyle = {
    backgroundColor: "#F5F5F5", // Gris muy claro para el fondo
    color: "#333333", // Gris oscuro para el texto principal
    fontFamily: "Montserrat, sans-serif", // Fuente moderna
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh" // Asegura que el contenido se extienda al menos al alto de la pantalla
  };

  const heroSectionStyle = {
    padding: "100px 0",
    textAlign: "center",
    backgroundImage: `url('URL_DE_TU_IMAGEN')`, // Reemplazar con la URL de tu imagen de fondo
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#FFFFFF", // Texto blanco sobre la imagen de fondo
    position: "relative",
    // ... otros estilos
  };

  const heroOverlayStyle = {
    // Estilo para un overlay sobre la imagen de fondo (opcional)
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Ejemplo: overlay negro con opacidad
  };

  const heroTitleStyle = {
    fontSize: "3em",
    fontWeight: "bold",
    marginBottom: "20px"
  };

  const heroSubtitleStyle = {
    fontSize: "1.5em",
    marginBottom: "30px"
  };

  const searchBarStyle = {
    // Estilos para la barra de búsqueda
    padding: "10px",
    width: "50%",
    maxWidth: "400px",
    borderRadius: "5px",
    border: "none",
    marginBottom: "20px",
  };

  const heroButtonStyle = {
    // Estilos para el botón
    backgroundColor: "#50C878",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2em",
  };

  const categorySectionStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "40px 0",
    overflowX: "auto" // Para carrusel horizontal en pantallas pequeñas
  };

  const categoryCardStyle = {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minWidth: "150px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    // ... otros estilos
  };

  const categoryImageStyle = {
    // Estilos para las imágenes de las categorías
    width: "100%",
    maxWidth: "100px",
    height: "auto"
  };

  const filterSectionStyle = {
    backgroundColor: "#FFFFFF",
    padding: "20px",
    borderBottom: "1px solid #E0E0E0"
  };

  const productGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Tarjetas más anchas
    gap: "30px",
    padding: "40px",
    justifyContent: "center" // Centrar las tarjetas
  };

  const productCardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px", // Bordes más redondeados
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Sombra más pronunciada
    textAlign: "center",
    position: "relative",
    overflow: "hidden" //  Asegura que las imágenes no se desborden
  };

  const productImageStyle = {
    width: "100%",
    borderRadius: "10px 10px 0 0", // Redondeado solo en la parte superior
    maxHeight: "300px", // Altura máxima para las imágenes
    objectFit: "cover" // Ajusta la imagen al contenedor manteniendo la proporción
  };

  const productDetailsStyle = {
    padding: "20px"
  };

  const productNameStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "10px"
  };

  const productPriceStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#008080", // Verde azulado para el precio
    marginBottom: "10px"
  };

  const addToCartButtonStyle = {
    backgroundColor: "#50C878", // Verde esmeralda
    color: "#FFFFFF",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    ":hover": {
      backgroundColor: "#38A360" // Verde más oscuro al hacer hover
    }
  };

  const featuredSectionStyle = {
    // Estilos para la sección de destacados/promociones
    padding: "40px 0",
    textAlign: "center"
  };

  // --- Componentes (Ejemplo) ---
  const HeroSection = () => (
    <header style={heroSectionStyle}>
      <div style={heroOverlayStyle}></div> {/* Overlay opcional */}
      <h1 style={heroTitleStyle}>Encuentra tus Lentes Perfectos</h1>
      <p style={heroSubtitleStyle}>Explora nuestra colección y descubre tu estilo ideal.</p>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por modelo, marca..."
        style={searchBarStyle}
      />
      {/* Botón de llamada a la acción */}
      <button style={heroButtonStyle}>Descubre la Colección</button>
    </header>
  );

  const CategorySection = () => (
    <section style={categorySectionStyle}>
      {/* Carrusel o grilla de categorías */}
      <CategoryCard
        imageUrl="URL_IMAGEN_SOL" // Reemplazar
        title="Lentes de Sol"
      />
      <CategoryCard
        imageUrl="URL_IMAGEN_RECETADOS" // Reemplazar
        title="Lentes Recetados"
      />
      <CategoryCard
        imageUrl="URL_IMAGEN_DEPORTIVOS" // Reemplazar
        title="Lentes Deportivos"
      />
      {/* ... Más categorías */}
    </section>
  );

  const CategoryCard = ({ imageUrl, title }) => (
    <div style={categoryCardStyle}>
      <img src={imageUrl} alt={title} style={categoryImageStyle} />
      <h3>{title}</h3>
    </div>
  );

  const FilterSection = () => {
    const [precio, setPrecio] = useState([0, 1000]); // Ejemplo de rango de precio
    const [marca, setMarca] = useState("");
    // ... Otros estados para los filtros

    return (
      <aside style={filterSectionStyle}>
        <h2>Filtrar por:</h2>

        {/* Filtro de Precio */}
        <div>
          <h3>Precio</h3>
          <input
            type="range"
            min="0"
            max="1000"
            value={precio[0]}
            onChange={(e) => setPrecio([e.target.value, precio[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={precio[1]}
            onChange={(e) => setPrecio([precio[0], e.target.value])}
          />
          <p>Rango: ${precio[0]} - ${precio[1]}</p>
        </div>

        {/* Filtro de Marca */}
        <div>
          <h3>Marca</h3>
          <select value={marca} onChange={(e) => setMarca(e.target.value)}>
            <option value="">Todas</option>
            <option value="Marca A">Marca A</option>
            <option value="Marca B">Marca B</option>
            {/* ... Más marcas */}
          </select>
        </div>

        {/* ... Otros filtros (Forma, Material, Color, etc.) */}
      </aside>
    );
  };

  const ProductGrid = () => (
    <main style={productGridStyle}>
      {productos.map(producto => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </main>
  );

  const ProductCard = ({ producto }) => (
    <div style={productCardStyle}>
      <img
        src={`http://localhost:5000/uploads/${producto.imagen}`}
        alt={producto.nombre}
        style={productImageStyle}
      />
      <div style={productDetailsStyle}>
        <h3 style={productNameStyle}>{producto.nombre}</h3>
        <p style={productPriceStyle}>${producto.precio}</p>
        <button
          onClick={() => agregarAlCarrito(producto)}
          style={addToCartButtonStyle}
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );

  const FeaturedSection = () => (
    <section style={featuredSectionStyle}>
      {/* ... Carrusel o galería de destacados */}
    </section>
  );

  return (
    <div style={containerStyle}>
      <Navbar />

      {/* --- Hero Section --- */}
      <HeroSection />

      {/* --- Sección de Categorías --- */}
      <CategorySection />

      {/* --- Sección de Filtros y Ordenamiento --- */}
      <FilterSection />

      {/* --- Sección de Productos --- */}
      <ProductGrid />

      {/* --- Sección de Destacados/Promociones --- */}
      <FeaturedSection />

      <Footer />
    </div>
  );
};

export default Lentes;