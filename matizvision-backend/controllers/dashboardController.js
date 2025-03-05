const { Usuario, Cita, DetalleCompra } = require('../models');

exports.getDashboardMetrics = async (req, res) => {
    try {
        console.log("📡 Obteniendo métricas del Dashboard...");

        // Obtener número total de usuarios
        const totalUsuarios = await Usuario.count();

        // Obtener número total de citas pendientes
        const totalCitasPendientes = await Cita.count({ where: { estado: 'pendiente' } });

        // Obtener número total de productos vendidos
        const totalProductosVendidos = await DetalleCompra.sum('cantidad') || 0;

        console.log("📊 Datos obtenidos:", {
            usuarios: totalUsuarios,
            citasPendientes: totalCitasPendientes,
            productosVendidos: totalProductosVendidos
        });

        res.json({
            usuarios: totalUsuarios,
            citasPendientes: totalCitasPendientes,
            productosVendidos: totalProductosVendidos
        });
    } catch (error) {
        console.error("❌ Error al obtener métricas:", error);
        res.status(500).json({ message: "Error al obtener datos del dashboard" });
    }
};