// models/Appointment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
    defaultValue: 'pendiente',
  },
}, {
  tableName: 'appointments',
  timestamps: true,
});

// Relación entre Appointment y User
Appointment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
User.hasMany(Appointment, {
  foreignKey: 'userId',
  as: 'appointments',
});

module.exports = Appointment;