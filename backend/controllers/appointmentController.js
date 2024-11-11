// controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Crear cita
exports.createAppointment = async (req, res) => {
  const { userId, date, time, serviceType, status } = req.body;
  try {
    const appointment = await Appointment.create({ userId, date, time, serviceType, status });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cita' });
  }
};

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: { model: User, as: 'user' } });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};

// Actualizar cita
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, time, serviceType, status } = req.body;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.serviceType = serviceType || appointment.serviceType;
    appointment.status = status || appointment.status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cita' });
  }
};

// Eliminar cita
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });

    await appointment.destroy();
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cita' });
  }
};