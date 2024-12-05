const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: 'La fecha debe ser válida' },
    },
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El tipo de servicio no puede estar vacío' },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente', // Valores posibles: pendiente, completado, cancelado
  },
});

Appointment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Appointment;