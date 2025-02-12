const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Compra extends Model {}

Compra.init({
    usuarioId: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    estado: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compras'
});

module.exports = Compra;