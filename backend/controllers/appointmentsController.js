const { Appointment } = require('../models');

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva cita
const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener citas de un cliente
const getClientAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: 'No se proporcionó el ID del usuario.' });
    }

    const appointments = await Appointment.findAll({ where: { user_id: userId } });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No se encontraron citas para este usuario.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener las citas del cliente:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Actualizar el estado de una cita
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    appointment.status = status;
    await appointment.save();
    res.json({ message: 'Estado actualizado', appointment });
  } catch (error) {
    console.error('Error al actualizar el estado de la cita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllAppointments,
  createAppointment,
  getClientAppointments,
  updateAppointmentStatus,
};