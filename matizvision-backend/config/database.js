const { Sequelize } = require('sequelize');
const config = require('./config'); 

const environment = process.env.NODE_ENV || 'development';

if (!config[environment]) {
    throw new Error(`❌ Error: No hay configuración para el entorno '${environment}'`);
}

const dbConfig = config[environment];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port || 5432,
        logging: false
    }
);

module.exports = sequelize;