const express = require('express'); // Framework web
const dotenv = require('dotenv'); // Cargar variables de entorno
const cors = require('cors'); // Manejo de CORS
const bodyParser = require('body-parser'); // Parsear JSON
const sequelize = require('./config/database'); // Configuración de la base de datos
const path = require('path');

// Cargar las variables de entorno desde .env
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware globales
app.use(cors()); 
app.use(bodyParser.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas (importar las rutas principales)
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');

// Rutas del API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/appointments', appointmentRoutes);

// Sincronizar la base de datos con Sequelize
sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

sequelize.sync({ force: false }) // Cambia a `true` si quieres eliminar y recrear tablas cada vez
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error al sincronizar la base de datos:', err));

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});