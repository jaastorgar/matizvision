const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
  try {
    const { userId, date, time, serviceType } = req.body;

    const appointment = await Appointment.create({
      userId,
      date,
      time,
      serviceType,
    });

    res.status(201).json({ message: 'Cita creada con éxito', appointment });
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
};

// Obtener todas las citas
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: { model: User, attributes: ['name', 'lastName'] },
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener citas', error });
  }
};

// Actualizar una cita
exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { date, time, serviceType, status } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.serviceType = serviceType || appointment.serviceType;
    appointment.status = status || appointment.status;

    await appointment.save();

    res.status(200).json({ message: 'Cita actualizada con éxito', appointment });
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    await appointment.destroy();

    res.status(200).json({ message: 'Cita eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
};