require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./Middlewares/Middleware');
const path = require('path');

const usersRoutes = require('./routes/users');
const appointmentsRoutes = require('./routes/appointments');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Prueba de conexión a la base de datos
sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos exitosa 🚀');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});