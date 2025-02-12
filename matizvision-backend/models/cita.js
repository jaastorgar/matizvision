const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Cita extends Model {}

Cita.init({
    usuarioId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    hora: DataTypes.TIME,
    email: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    estado: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Cita',
    tableName: 'Cita'
});

module.exports = Cita;