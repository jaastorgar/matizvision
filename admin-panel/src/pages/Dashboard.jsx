import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api/api';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        usuarios: 0,
        citasPendientes: 0,
        productosVendidos: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("📡 Solicitando métricas del dashboard...");
                const response = await api.get('/dashboard');
                console.log("✅ Datos recibidos:", response.data);

                if (!response.data) {
                    setError("No hay datos disponibles.");
                } else {
                    setMetrics({
                        usuarios: Number.isFinite(response.data.usuarios) ? Math.round(response.data.usuarios) : 0,
                        citasPendientes: Number.isFinite(response.data.citasPendientes) ? Math.round(response.data.citasPendientes) : 0,
                        productosVendidos: Number.isFinite(response.data.productosVendidos) ? Math.round(response.data.productosVendidos) : 0
                    });
                }
            } catch (error) {
                console.error("❌ Error al obtener métricas:", error.response?.data || error.message);
                setError("No se pudieron obtener los datos del servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log("📊 Datos para la gráfica:", metrics);

    const data = [
        { name: 'Usuarios', value: metrics.usuarios },
        { name: 'Citas Pendientes', value: metrics.citasPendientes },
        { name: 'Productos Vendidos', value: metrics.productosVendidos }
    ];

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '105%', 
            height: '90vh', 
            padding: '20px'
        }}>
            <h2 style={{ marginBottom: '20px' }}>Metrica Clave</h2>
            {loading ? (
                <p>🔄 Cargando datos...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>⚠️ {error}</p>
            ) : (
                <div style={{
                    width: '80%',
                    height: '400px',
                    backgroundColor: '#1a1a2e',
                    padding: '30px',
                    borderRadius: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barSize={60}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 14 }} angle={0} dy={10} interval={0} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default Dashboard;