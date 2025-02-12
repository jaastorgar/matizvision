const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AdminLogs extends Model {}

AdminLogs.init({
    adminId: DataTypes.INTEGER,
    accion: DataTypes.STRING,
    fecha: DataTypes.DATE
}, {
    sequelize,
    modelName: 'AdminLogs',
    tableName: 'AdminLogs'
});

module.exports = AdminLogs;