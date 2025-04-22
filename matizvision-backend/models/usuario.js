const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuario extends Model {}

Usuario.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: {
        args: /^[0-9]{7,8}$/,
        msg: "El RUT debe contener entre 7 y 8 dígitos numéricos (sin puntos ni guion)."
      }
    }
  },
  dv: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[0-9kK]$/,
        msg: "El dígito verificador (DV) debe ser un número entre 0-9 o la letra 'K'."
      }
    }
  },
  telefono: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "cliente",
    validate: {
      isIn: {
        args: [["cliente", "admin", "trabajador"]],
        msg: "El rol debe ser 'cliente', 'admin' o 'trabajador'."
      }
    }
  }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuarios',
  timestamps: true
});

module.exports = Usuario;