'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Appointment, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      rut: DataTypes.STRING,
      dv: DataTypes.CHAR,
      age: DataTypes.INTEGER,
      birth_date: DataTypes.DATE,
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cliente',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
    }
  );
  return User;
};