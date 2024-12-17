const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClientAppointments = sequelize.define('ClientAppointments', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  });

  return ClientAppointments;
};