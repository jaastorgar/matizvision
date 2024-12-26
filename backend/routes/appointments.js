const express = require('express');
const { getAllAppointments, createAppointment, getClientAppointments } = require('../controllers/appointmentsController');
const authenticateUser = require('../Middlewares/auth');

const router = express.Router();

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    console.log("Petición para obtener todas las citas");
    await getAllAppointments(req, res);
  } catch (error) {
    console.error("Error al obtener todas las citas:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
  try {
    console.log("Datos recibidos para crear cita:", req.body);
    await createAppointment(req, res);
  } catch (error) {
    console.error("Error al crear cita:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta protegida para obtener citas de un cliente
router.get('/client', authenticateUser, async (req, res) => {
  try {
    console.log("Usuario autenticado para obtener citas:", req.user); // Asegúrate de que req.user está definido.
    await getClientAppointments(req, res);
  } catch (error) {
    console.error("Error al obtener citas del cliente:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;