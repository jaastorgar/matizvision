const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middleware/authMiddleware');

// Ruta para crear una cita (solo autenticados)
router.post('/create', verifyToken, appointmentController.createAppointment);

// Ruta para obtener citas de un usuario autenticado
router.get('/user', verifyToken, appointmentController.getUserAppointments);

module.exports = router;