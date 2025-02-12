require('dotenv').config();

module.exports = {
  
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "Mamita10.",
    database: process.env.DB_NAME || "matizvision_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres"
  },
  test: {
    username: "postgres",
    password: "Mamita10.",
    database: "matizvision_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || "postgres"
  }
};