import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../api/api';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        clientes: 0,
        administradores: 0,
        trabajadores: 0,
        citasPendientes: 0,
        citasConfirmadas: 0,
        citasRechazadas: 0,
        citasReprogramadas: 0
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
                        clientes: response.data.clientes || 0,
                        administradores: response.data.administradores || 0,
                        trabajadores: response.data.trabajadores || 0,
                        citasPendientes: response.data.citasPendientes || 0,
                        citasConfirmadas: response.data.citasConfirmadas || 0,
                        citasRechazadas: response.data.citasRechazadas || 0,
                        citasReprogramadas: response.data.citasReprogramadas || 0
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

    const dataUsuarios = [
        { name: 'Clientes', value: metrics.clientes },
        { name: 'Administradores', value: metrics.administradores },
        { name: 'Trabajadores', value: metrics.trabajadores }
    ];

    const dataCitas = [
        { name: 'Pendientes', value: metrics.citasPendientes },
        { name: 'Confirmadas', value: metrics.citasConfirmadas },
        { name: 'Rechazadas', value: metrics.citasRechazadas },
        { name: 'Reprogramadas', value: metrics.citasReprogramadas }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '90vh',
            padding: '20px'
        }}>
            <h2 style={{ marginBottom: '20px' }}>📊 Métricas Clave</h2>
            {loading ? (
                <p>🔄 Cargando datos...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>⚠️ {error}</p>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    {/* Gráfico de Usuarios */}
                    <div style={{
                        flex: 1,
                        height: '300px',
                        backgroundColor: '#1a1a2e',
                        padding: '60px',
                        borderRadius: '30px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h3 style={{ color: 'white', textAlign: 'center' }}>👤 Usuarios</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataUsuarios} barSize={60}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Gráfico de Citas */}
                    <div style={{
                        flex: 1,
                        height: '300px',
                        backgroundColor: '#1a1a2e',
                        padding: '60px',
                        borderRadius: '30px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h3 style={{ color: 'white', textAlign: 'center' }}>📅 Citas</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataCitas} barSize={60}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 14 }} interval={0} />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;