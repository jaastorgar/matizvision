const express = require('express');
const { getAllAppointments, createAppointment } = require('../controllers/appointmentsController');

const router = express.Router();

// Obtener todas las citas
router.get('/', getAllAppointments);

// Crear una nueva cita
router.post('/', createAppointment);

module.exports = router;