const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const path = require('path');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware globales
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar asociaciones
require('./models/Associations');

// Importar rutas
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);

// Sincronizar la base de datos con Sequelize
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

sequelize.sync({ force: false }) // Cambiar a `force: true` para recrear las tablas
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});