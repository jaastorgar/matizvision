// app.js
const express = require('express');
const cors = require('cors'); // Importa cors
const sequelize = require('./config/database'); // Importa la conexión de la base de datos
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Habilitar CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);

// Sincronizar los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos y tablas sincronizadas');
  })
  .catch((error) => console.error('Error al sincronizar con la base de datos:', error));

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});