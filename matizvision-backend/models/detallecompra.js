const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class DetalleCompra extends Model {}

DetalleCompra.init(
    {
        compraId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Compra", 
                key: "id"
            }
        },
        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precioUnitario: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "DetalleCompra",
        tableName: "DetalleCompras"
    }
);

module.exports = DetalleCompra;