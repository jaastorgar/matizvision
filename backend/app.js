require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const usersRoutes = require('./routes/users');
const appointmentsRoutes = require('./routes/appointments');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

/* 
Debugging: Verifica el tipo de las rutas importadas
console.log('usersRoutes:', typeof usersRoutes); // Debería imprimir 'function'
console.log('appointmentsRoutes:', typeof appointmentsRoutes);
console.log('productsRoutes:', typeof productsRoutes);
console.log('ordersRoutes:', typeof ordersRoutes);
*/

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/users', usersRoutes); // Correcto
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

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