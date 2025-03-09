require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

const app = express();

// ✅ Configuración avanzada de CORS
app.use(cors());
app.options('*', (req, res) => res.sendStatus(200));

// ✅ Middleware para analizar JSON
app.use(express.json());

// ✅ Servir archivos estáticos (para imágenes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de Matiz Vision en funcionamiento 🚀');
});

// ✅ Importar rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/citas', require('./routes/citaRoutes'));
app.use('/api/compras', require('./routes/compraRoutes'));
app.use('/api/adminlogs', require('./routes/adminLogsRoutes'));
app.use('/api/testimonios', require('./routes/testimonioRoutes'));
app.use('/api/panelsettings', require('./routes/panelsettingsRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/usuarios', require('./safetyroute/userRoutes'));
app.use('/api/admincitas', require('./safetyroute/adminCitaRoutes'));
app.use('/api/adminproducts', require('./safetyroute/adminProductoRoutes'));

// ✅ Conectar Base de Datos
sequelize.sync().then(() => console.log('Base de datos sincronizada'));

// ✅ Iniciar Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));