const { Usuario, Cita, DetalleCompra } = require('../models');

exports.getDashboardMetrics = async (req, res) => {
    try {
        console.log("📡 Obteniendo métricas del Dashboard...");

        // 👤 Usuarios desglosados
        const totalClientes = await Usuario.count({ where: { rol: 'cliente' } });
        const totalAdministradores = await Usuario.count({ where: { rol: 'admin' } });
        const totalTrabajadores = await Usuario.count({ where: { rol: 'trabajador' } });

        // 📅 Citas desglosadas
        const citasPendientes = await Cita.count({ where: { estado: 'pendiente' } });
        const citasConfirmadas = await Cita.count({ where: { estado: 'confirmada' } });
        const citasRechazadas = await Cita.count({ where: { estado: 'rechazada' } });
        const citasReprogramadas = await Cita.count({ where: { estado: 'reprogramada' } });

        // 📦 Productos vendidos
        const totalProductosVendidos = await DetalleCompra.sum('cantidad') || 0;

        console.log("📊 Datos obtenidos:", {
            clientes: totalClientes,
            administradores: totalAdministradores,
            trabajadores: totalTrabajadores,
            citasPendientes,
            citasConfirmadas,
            citasRechazadas,
            citasReprogramadas,
            productosVendidos: totalProductosVendidos
        });

        res.json({
            clientes: totalClientes,
            administradores: totalAdministradores,
            trabajadores: totalTrabajadores,
            citasPendientes,
            citasConfirmadas,
            citasRechazadas,
            citasReprogramadas,
            productosVendidos: totalProductosVendidos
        });
    } catch (error) {
        console.error("❌ Error al obtener métricas:", error);
        res.status(500).json({ message: "Error al obtener datos del dashboard" });
    }
};