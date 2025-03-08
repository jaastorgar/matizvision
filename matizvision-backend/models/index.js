const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos existentes
const Usuario = require('./usuario');
const Producto = require('./producto');
const Compra = require('./compra');
const DetalleCompra = require('./detallecompra');
const Cita = require('./cita');
const AdminLogs = require('./adminlogs');
const Testimonio = require('./testimonio');
const PanelSettings = require('./panelsettings');

// Definir relaciones
Usuario.hasMany(Compra, { foreignKey: 'usuarioId' });
Compra.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Compra.hasMany(DetalleCompra, { foreignKey: 'compraId' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'compraId' });

Producto.hasMany(DetalleCompra, { foreignKey: 'productoId' });
DetalleCompra.belongsTo(Producto, { foreignKey: 'productoId' });

Usuario.hasMany(Cita, { foreignKey: 'usuarioId' });
Cita.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Testimonio, { foreignKey: 'usuarioId' });
Testimonio.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(AdminLogs, { foreignKey: 'adminId' });
AdminLogs.belongsTo(Usuario, { foreignKey: 'adminId' });

Usuario.hasMany(Cita, { foreignKey: "usuarioId", as: "citas" });
Cita.belongsTo(Usuario, { foreignKey: "usuarioId", as: "cliente" });

// Exportar modelos
module.exports = {
    sequelize,
    Usuario,
    Producto,
    Compra,
    DetalleCompra,
    Cita,
    AdminLogs,
    Testimonio,
    PanelSettings
};