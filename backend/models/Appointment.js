const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Appointment extends Model {}

  Appointment.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pendiente', 'confirmado', 'cancelado'),
      defaultValue: 'pendiente',
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    tableName: 'Appointments',
    timestamps: true,
  });

  return Appointment;
};