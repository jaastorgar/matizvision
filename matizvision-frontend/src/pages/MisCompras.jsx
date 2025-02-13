import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const MisCompras = () => {
    const [compras, setCompras] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!usuario) {
            alert("❌ Debes iniciar sesión para ver tus compras.");
            return;
        }

        const fetchCompras = async () => {
            try {
                const token = localStorage.getItem("token"); // Obtiene el token de autenticación
                const response = await api.get(`/compras/${usuario.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCompras(response.data);
            } catch (error) {
                console.error("❌ Error al obtener compras:", error);
            }
        };

        fetchCompras();
    }, [usuario]);

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center', color: '#0a0a1f' }}>Mis Compras</h2>

            {compras.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#555' }}>No tienes compras registradas.</p>
            ) : (
                compras.map((compra) => (
                    <div key={compra.id} style={compraStyle}>
                        <h3>🛒 Compra #{compra.id}</h3>
                        <p><strong>Fecha:</strong> {new Date(compra.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${compra.total}</p>
                        <p><strong>Estado:</strong> {compra.estado}</p>

                        <h4>Productos:</h4>
                        <ul>
                            {compra.DetalleCompras.map((detalle) => (
                                <li key={detalle.productoId}>
                                    {detalle.Producto.nombre} - {detalle.cantidad} x ${detalle.Producto.precio} = ${detalle.cantidad * detalle.Producto.precio}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

const compraStyle = {
    padding: '15px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
};

export default MisCompras;