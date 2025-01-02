const express = require('express');
const {
  getAllAppointments,
  createAppointment,
  getClientAppointments,
  updateAppointmentStatus,
  getAppointmentsByUser,
} = require('../controllers/appointmentsController');
const {authenticateUser, isAuthenticated} = require('../Middlewares/auth');

const router = express.Router();

// Rutas para citas
router.get('/', authenticateUser, getAllAppointments); 
router.post('/', authenticateUser, createAppointment);
router.get('/client', authenticateUser, getClientAppointments);
router.put('/:id', authenticateUser, updateAppointmentStatus);
router.get('/appointments', isAuthenticated, getAppointmentsByUser);

module.exports = router;