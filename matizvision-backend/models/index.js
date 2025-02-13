const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const Usuario = require('./usuario');
const Producto = require('./producto');
const Compra = require('./compra');
const DetalleCompra = require('./detallecompra');
const Cita = require('./cita');
const AdminLogs = require('./adminlogs');

// Definir relaciones
Usuario.hasMany(Compra, { foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Compra.hasMany(DetalleCompra, { foreignKey: 'compraId' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'compraId' });

Producto.hasMany(DetalleCompra, { foreignKey: 'productoId' });
DetalleCompra.belongsTo(Producto, { foreignKey: 'productoId' });

Usuario.hasMany(Cita, { foreignKey: 'usuarioId' });
Cita.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Exportar los modelos
module.exports = {
    sequelize,
    Usuario,
    Producto,
    Compra,
    DetalleCompra,
    Cita,
    AdminLogs
};