const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DetalleCompra extends Model {}

DetalleCompra.init({
    compraId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'DetalleCompra',
    tableName: 'DetalleCompras'
});

module.exports = DetalleCompra;