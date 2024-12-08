const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dv: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cliente',
  },
});

module.exports = User;