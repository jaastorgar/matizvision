const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Crear una cita
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, serviceType, userId } = req.body;
    const appointment = await Appointment.create({
      date,
      time,
      serviceType,
      userId: userId || null, // Si no hay usuario autenticado, se establece como null
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error al crear la cita' });
  }
};

// Obtener citas del usuario autenticado
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.findAll({ where: { userId } });
    res.json(appointments);
  } catch (error) {
    console.error('Error al obtener las citas del usuario:', error);
    res.status(500).json({ message: 'Error al obtener las citas' });
  }
};