const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:usuarioId', authMiddleware, citaController.obtenerCitasPorUsuario);
router.post('/', citaController.createCita);
router.put('/:id', authMiddleware, citaController.updateCita);
router.delete('/:id', authMiddleware, citaController.deleteCita);

module.exports = router;