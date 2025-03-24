const { Usuario, Cita, Producto } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardMetrics = async (req, res) => {
  try {
    console.log('📊 Obteniendo métricas del Dashboard...');

    // Obtener usuarios por rol
    const clientes = await Usuario.count({ where: { rol: 'cliente' } });
    const administradores = await Usuario.count({ where: { rol: 'admin' } });
    const trabajadores = await Usuario.count({ where: { rol: 'trabajador' } });

    // Obtener citas por estado
    const citasPendientes = await Cita.count({ where: { estado: 'pendiente' } });
    const citasConfirmadas = await Cita.count({ where: { estado: 'confirmada' } });
    const citasRechazadas = await Cita.count({ where: { estado: 'rechazada' } });
    const citasReprogramadas = await Cita.count({ where: { estado: 'reprogramada' } });

    // Obtener productos con stock bajo (menor a 5)
    const productosBajoStock = await Producto.findAll({
      where: {
        stock: {
          [Op.lt]: 5,
        },
      },
      attributes: ['nombre', 'stock'],
    });

    console.log('📦 Productos con stock bajo:', productosBajoStock);

    res.json({
      clientes,
      administradores,
      trabajadores,
      citasPendientes,
      citasConfirmadas,
      citasRechazadas,
      citasReprogramadas,
      productosBajoStock,
    });
  } catch (error) {
    console.error('❌ Error al obtener métricas:', error);
    res.status(500).json({ message: 'Error al obtener datos del dashboard' });
  }
};