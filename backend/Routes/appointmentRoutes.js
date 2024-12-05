const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Crear una nueva cita
router.post('/', appointmentController.createAppointment);

// Obtener todas las citas
router.get('/', appointmentController.getAppointments);

// Actualizar una cita
router.put('/:id', appointmentController.updateAppointment);

// Eliminar una cita
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;