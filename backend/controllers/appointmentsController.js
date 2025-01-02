const { Appointment } = require('../models');

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Crear una nueva cita
const createAppointment = async (req, res) => {
  try {
    const { email, date, time, service_type, status } = req.body;

    const user_id = req.user?.id || null;

    const appointment = await Appointment.create({
      user_id,
      email,
      date,
      time,
      service_type,
      status: status || 'pendiente',
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener citas de un cliente
const getClientAppointments = async (req, res) => {
  try {
    const email = req.query.email || req.user?.email;
    if (!email) {
      return res.status(400).json({ error: 'No se proporcionó el correo del usuario.' });
    }

    const appointments = await Appointment.findAll({ where: { email } });
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No se encontraron citas para este usuario.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener las citas del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Actualizar el estado de una cita
const updateAppointmentStatus = async (req, res) => {
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

// Obtener citas de un usuario por ID
const getAppointmentsByUser = async (req, res) => {
  const { user_id } = req.query; // Se espera que `user_id` sea enviado desde el frontend.

  if (!user_id) {
    return res.status(400).json({ error: 'No se proporcionó el ID del usuario.' });
  }

  try {
    const appointments = await Appointment.findAll({ where: { user_id } });

    if (appointments.length === 0) {
      return res.status(404).json({ error: 'No se encontraron citas para este usuario.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  getAllAppointments,
  createAppointment,
  getClientAppointments,
  updateAppointmentStatus,
  getAppointmentsByUser,
};