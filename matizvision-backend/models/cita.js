const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cita extends Model {}

Cita.init({
    usuarioId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Cita',
    tableName: 'Citas'
});

module.exports = Cita;