import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/adminlogs', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => setLogs(response.data))
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h2>Registro de Actividades</h2>
            <table>
                <thead>
                    <tr>
                        <th>Administrador</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td>{log.Usuario?.nombre}</td>
                            <td>{log.accion}</td>
                            <td>{new Date(log.fecha).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminLogs;