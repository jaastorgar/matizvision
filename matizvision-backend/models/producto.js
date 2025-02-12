const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Producto extends Model {}

Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    imagen: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Productos'
});

module.exports = Producto;