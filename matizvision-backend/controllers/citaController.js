const { Cita } = require('../models');

// Obtener todas las citas (solo administradores o clientes autenticados)
exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener citas" });
  }
};

// Crear una nueva cita (clientes autenticados y no autenticados)
exports.createCita = async (req, res) => {
  try {
    const { fecha, hora, userId, email, telefono } = req.body;

    if (!fecha || !hora) {
      return res.status(400).json({ msg: "Fecha y hora son obligatorias" });
    }

    let nuevaCita;
    if (userId) {
      // Cliente autenticado
      nuevaCita = await Cita.create({ fecha, hora, userId, estado: "Pendiente" });
    } else if (email && telefono) {
      // Usuario no autenticado
      nuevaCita = await Cita.create({ fecha, hora, email, telefono, estado: "Pendiente - No autenticado" });
    } else {
      return res.status(400).json({ msg: "Debe proporcionar correo y teléfono si no está autenticado" });
    }

    res.status(201).json({ msg: "Cita solicitada con éxito", cita: nuevaCita });
  } catch (error) {
    res.status(500).json({ msg: "Error al solicitar la cita" });
  }
};

// Actualizar una cita (solo clientes autenticados)
exports.updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    await cita.update({ fecha, hora });
    res.json({ msg: "Cita actualizada con éxito", cita });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la cita" });
  }
};

// Eliminar una cita
exports.deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    await cita.destroy();
    res.json({ msg: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la cita" });
  }
};