const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Compra = require("./compra"); // ✅ Importamos el modelo Compra

class DetalleCompra extends Model {}

DetalleCompra.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        compraId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Compra,
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
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