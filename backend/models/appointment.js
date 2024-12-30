'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Appointment.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: DataTypes.DATE,
      time: DataTypes.TIME,
      service_type: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
      },
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