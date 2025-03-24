import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import api from '../api/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    clientes: 0,
    administradores: 0,
    trabajadores: 0,
    citasPendientes: 0,
    citasConfirmadas: 0,
    citasRechazadas: 0,
    citasReprogramadas: 0,
    productosBajoStock: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('📡 Solicitando métricas del dashboard...');
        const response = await api.get('/dashboard');
        console.log('✅ Datos recibidos:', response.data);

        if (!response.data) {
          setError('No hay datos disponibles.');
        } else {
          setMetrics({
            clientes: response.data.clientes || 0,
            administradores: response.data.administradores || 0,
            trabajadores: response.data.trabajadores || 0,
            citasPendientes: response.data.citasPendientes || 0,
            citasConfirmadas: response.data.citasConfirmadas || 0,
            citasRechazadas: response.data.citasRechazadas || 0,
            citasReprogramadas: response.data.citasReprogramadas || 0,
            productosBajoStock: response.data.productosBajoStock || [],
          });
        }
      } catch (error) {
        console.error(
          '❌ Error al obtener métricas:',
          error.response?.data || error.message
        );
        setError('No se pudieron obtener los datos del servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataUsuarios = [
    { name: 'Clientes', value: metrics.clientes },
    { name: 'Administradores', value: metrics.administradores },
    { name: 'Trabajadores', value: metrics.trabajadores },
  ];

  const dataCitas = [
    { name: 'Pendientes', value: metrics.citasPendientes },
    { name: 'Confirmadas', value: metrics.citasConfirmadas },
    { name: 'Rechazadas', value: metrics.citasRechazadas },
    { name: 'Reprogramadas', value: metrics.citasReprogramadas },
  ];

  const dataStock = metrics.productosBajoStock.map((prod) => ({
    name: prod.nombre,
    value: prod.stock,
  }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '90vh',
        padding: '20px',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>📊 Métricas Clave</h2>
      {loading ? (
        <p>🔄 Cargando datos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>⚠️ {error}</p>
      ) : (
        <>
          {metrics.productosBajoStock.length > 0 && (
            <div style={{ color: 'orange', marginBottom: '20px' }}>
              ⚠️ Hay productos con stock bajo:
              <ul>
                {metrics.productosBajoStock.map((prod) => (
                  <li key={prod.nombre}>
                    {prod.nombre} (Stock: {prod.stock})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Card title="👤 Usuarios" color="#8884d8" data={dataUsuarios} />
            <Card title="📅 Citas" color="#82ca9d" data={dataCitas} />
            {dataStock.length > 0 && (
              <Card title="📦 Stock Bajo" color="#ffcc00" data={dataStock} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ title, color, data }) => (
  <div
    style={{
      flex: '1 1 300px',
      height: '300px',
      backgroundColor: '#1a1a2e',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}
  >
    <h3 style={{ color: 'white', textAlign: 'center' }}>{title}</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barSize={60}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default Dashboard;