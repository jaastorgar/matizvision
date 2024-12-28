const express = require('express');
const {
  getAllAppointments,
  createAppointment,
  getClientAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentsController');
const { authenticateUser, verifyToken }  = require('../Middlewares/auth');

const router = express.Router();

router.get('/', authenticateUser, getAllAppointments);
router.post('/appointments', verifyToken, createAppointment);
router.get('/client', authenticateUser, getClientAppointments);
router.put('/:id', authenticateUser, updateAppointmentStatus);

module.exports = router;