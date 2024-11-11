const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables del archivo .env

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;