const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario'); // Importamos el modelo de Usuario para la relación

class AdminLogs extends Model {}

AdminLogs.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Relación con la tabla de Usuarios
            key: 'id'
        }
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'AdminLogs',
    tableName: 'adminlogs',
    timestamps: false
});

// Definimos la relación con la tabla Usuarios
AdminLogs.belongsTo(Usuario, { foreignKey: 'adminId' });

module.exports = AdminLogs;