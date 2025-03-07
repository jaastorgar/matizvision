import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No tienes permisos para acceder a esta información.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/adminlogs', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setLogs(response.data);
            } catch (err) {
                setError('Error al obtener los registros.');
                console.error('Error:', err);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.title}>Registro de Actividades</h2>

                {error ? (
                    <p style={styles.error}>{error}</p>
                ) : (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Administrador</th>
                                    <th>Acción</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length > 0 ? (
                                    logs.map(log => (
                                        <tr key={log.id}>
                                            <td>{log.Usuario?.nombre || 'Desconocido'}</td>
                                            <td>{log.accion}</td>
                                            <td>{new Date(log.fecha).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={styles.noData}>No hay registros disponibles.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#121212',
    },
    container: {
        width: '90%',
        maxWidth: '1200px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
    },
    title: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
    },
    tableContainer: {
        overflowX: 'auto',
        maxHeight: '500px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f9f9f9',
    },
    noData: {
        textAlign: 'center',
        padding: '10px',
        color: '#888',
    },
    error: {
        color: 'red',
        fontSize: '16px',
        fontWeight: 'bold',
    }
};

export default AdminLogs;