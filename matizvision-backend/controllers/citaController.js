const { Cita } = require('../models');

exports.getAllCitas = async (req, res) => {
  try {
    const citas = await Cita.findAll();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener citas" });
  }
};

exports.createCita = async (req, res) => {
  try {
      const { fecha, hora, userId, email, telefono } = req.body;

      if (!fecha || !hora) {
          return res.status(400).json({ msg: "❌ La fecha y la hora son obligatorias." });
      }

      if (!userId && (!email || !telefono)) {
          return res.status(400).json({ msg: "❌ El correo y teléfono son obligatorios para usuarios no registrados." });
      }

      const nuevaCita = await Cita.create({
          usuarioId: userId || null,
          fecha,
          hora,
          email: userId ? null : email,
          telefono: userId ? null : telefono,
          estado: 'pendiente'
      });

      res.status(201).json({ msg: "✅ Cita creada con éxito", cita: nuevaCita });

  } catch (error) {
      console.error("❌ Error en createCita:", error);
      res.status(500).json({ msg: "❌ Error al solicitar la cita", error: error.message });
  }
};

exports.updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ msg: "❌ Cita no encontrada" });
    }

    await cita.update({ fecha, hora });
    res.json({ msg: "✅ Cita actualizada con éxito", cita });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al actualizar la cita" });
  }
};

exports.deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await Cita.findByPk(id);

    if (!cita) {
      return res.status(404).json({ msg: "❌ Cita no encontrada" });
    }

    await cita.destroy();
    res.json({ msg: "✅ Cita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error al eliminar la cita" });
  }
};

exports.obtenerCitasPorUsuario = async (req, res) => {
  try {
      const { usuarioId } = req.params;

      // Verificar que el usuarioId es un número válido
      if (!usuarioId) {
          return res.status(400).json({ msg: "❌ Usuario ID es obligatorio" });
      }

      // Buscar citas en la base de datos
      const citas = await Cita.findAll({ where: { usuarioId } });

      if (!citas.length) {
          return res.status(404).json({ msg: "❌ No se encontraron citas para este usuario" });
      }

      res.json(citas);
  } catch (error) {
      console.error("❌ Error al obtener citas:", error);
      res.status(500).json({ msg: "❌ Error interno del servidor", error: error.message });
  }
};