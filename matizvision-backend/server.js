require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// ✅ Configuración avanzada de CORS
app.use(cors());
app.options('*', (req, res) => res.sendStatus(200)); // Permite OPTIONS globalmente

// ✅ Middleware para analizar JSON
app.use(express.json());

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

// ✅ Conectar Base de Datos
sequelize.sync().then(() => {
    if (process.env.NODE_ENV !== 'test') console.log('Base de datos sincronizada');
});

// ✅ Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error("❌ ERROR DETECTADO:", err.stack);
    res.status(500).json({ msg: "Error interno del servidor" });
});

// ✅ Iniciar Servidor
const PORT = process.env.PORT || 5000;

let server = null; // 👈 Asegurar que existe aunque esté en modo test

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}

module.exports = { app, server };