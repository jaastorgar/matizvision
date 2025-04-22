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
        const response = await api.get('/dashboard');
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
      } catch (error) {
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
    <div className="dashboard">
      <h1 className="dashboard-title">📊 Panel de Control</h1>

      {loading ? (
        <p className="dashboard-loading">🔄 Cargando datos...</p>
      ) : error ? (
        <p className="dashboard-error">❌ {error}</p>
      ) : (
        <>
          {metrics.productosBajoStock.length > 0 && (
            <div className="alert-stock">
              <strong>⚠ Productos con bajo stock:</strong>
              <ul>
                {metrics.productosBajoStock.map((p) => (
                  <li key={p.nombre}>{p.nombre} (Stock: {p.stock})</li>
                ))}
              </ul>
            </div>
          )}

          <div className="dashboard-grid">
            <Card title="👥 Usuarios" color="#8e44ad" data={dataUsuarios} />
            <Card title="📅 Citas" color="#27ae60" data={dataCitas} />
            {dataStock.length > 0 && (
              <Card title="📦 Stock Bajo" color="#f39c12" data={dataStock} />
            )}
          </div>
        </>
      )}

      {/* ESTILOS */}
      <style>{`
        .dashboard {
          padding: 2rem;
          background: #f4f6f9;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .dashboard-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .dashboard-loading,
        .dashboard-error {
          text-align: center;
          font-size: 1.2rem;
          color: #999;
        }

        .alert-stock {
          background: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          color: #856404;
        }

        .alert-stock ul {
          margin-top: 0.5rem;
          padding-left: 1.2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card-container {
          background: #1e272e;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          color: #ecf0f1;
        }

        .card-container h3 {
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .recharts-wrapper {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
};

const Card = ({ title, color, data }) => (
  <div className="card-container">
    <h3>{title}</h3>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} barSize={50}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default Dashboard;