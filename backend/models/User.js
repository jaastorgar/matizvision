const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede estar vacío' },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El apellido no puede estar vacío' },
    },
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: { args: [7, 8], msg: 'El RUT debe tener entre 7 y 8 caracteres' },
    },
  },
  dv: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [1, 1], msg: 'El DV debe ser un carácter' },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'La edad debe ser un número entero' },
      min: { args: 0, msg: 'La edad no puede ser negativa' },
    },
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: 'La fecha de nacimiento debe ser válida' },
    },
  },
  photo: {
    type: DataTypes.STRING, // Almacena la URL o ruta del archivo de la foto
    allowNull: true,
    defaultValue: '/uploads/users/default.jpg',
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'cliente', // Rol predeterminado
  },
});

module.exports = User;