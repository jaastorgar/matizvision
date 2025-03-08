const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas para citas de usuarios autenticados
router.get('/:usuarioId', verifyToken, citaController.obtenerCitasPorUsuario);

// 📌 Permitir a usuarios no autenticados solicitar citas
router.post('/', citaController.createCita);

module.exports = router;