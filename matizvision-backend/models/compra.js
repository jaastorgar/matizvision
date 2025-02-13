const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Compra extends Model {}

Compra.init({
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Compra',
    tableName: 'Compras'
});

module.exports = Compra;