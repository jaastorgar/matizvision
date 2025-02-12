const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuario extends Model {}

Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    rol: {
        type: DataTypes.STRING,
        defaultValue: "cliente"
    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios'
});

module.exports = Usuario;