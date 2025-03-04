const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ Usamos la función correcta

// Rutas protegidas para citas
router.get('/:usuarioId', verifyToken, citaController.obtenerCitasPorUsuario);
router.post('/', verifyToken, citaController.createCita);
router.put('/:id', verifyToken, citaController.updateCita);
router.delete('/:id', verifyToken, citaController.deleteCita);

module.exports = router;