const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Testimonio extends Model {}

Testimonio.init(
    {
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
                model: "Usuarios",
                key: "id",
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Testimonio",
        tableName: "Testimonios",
        timestamps: true,
    }
);

module.exports = Testimonio;