const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
dotenv.config();

const app = express();
app.use(express.json());

// Sincroniza la base de datos
sequelize.sync({ force: true }).then(() => {
  console.log('Base de datos sincronizada');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));