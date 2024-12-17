require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Conexión a la base de datos

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Prueba de conexión a la base de datos
sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos exitosa 🚀');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

// Levantar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});