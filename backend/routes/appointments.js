const express = require('express');
const { getAllAppointments, createAppointment, getClientAppointments } = require('../controllers/appointmentsController');
const authenticateUser = require('../Middlewares/auth');

const router = express.Router();

// Obtener todas las citas
router.get('/', getAllAppointments);

// Crear una nueva cita
router.post('/', createAppointment);

// Ruta protegida para obtener citas de un cliente
router.get('/client', authenticateUser, getClientAppointments);

module.exports = router;
