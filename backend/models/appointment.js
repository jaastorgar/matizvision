'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      // Relación: Una cita pertenece a un usuario
      Appointment.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Appointment.init(
    {
      user_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      service_type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'Appointments',
      underscored: true,
    }
  );
  return Appointment;
};