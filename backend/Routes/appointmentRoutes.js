const express = require('express');
const appointmentController = require('../Controllers/appointmentController');
const { storeClientAppointment } = require('../Controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/appointments/client', authMiddleware, storeClientAppointment);

// Crear una nueva cita
router.post('/', appointmentController.createAppointment);

// Obtener todas las citas
router.get('/', appointmentController.getAppointments);

// Actualizar una cita
router.put('/:id', appointmentController.updateAppointment);

// Eliminar una cita
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;