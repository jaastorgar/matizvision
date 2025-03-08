import { useEffect, useState } from "react";
import api from "../api/api"; // 🔗 Conexión directa con la API
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  color: white;
`;

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Obtener productos (Solo Admin)
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/adminproducts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Error al cargar productos.");
        console.error("❌ Error al obtener productos:", err);
      }
      setLoading(false);
    };

    fetchProductos();
  }, []);

  return (
    <Container>
      <h2>📦 Gestión de Productos</h2>
      {loading ? <p>🔄 Cargando productos...</p> : error ? <p style={{ color: "red" }}>⚠️ {error}</p> : <p>✅ Productos cargados</p>}
    </Container>
  );
};

export default GestionProductos;