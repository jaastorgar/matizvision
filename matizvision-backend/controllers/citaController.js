const { Cita } = require('../models');

exports.createCita = async (req, res) => {
  try {
      const { fecha, hora, usuarioId, email, telefono } = req.body;

      if (!fecha || !hora) {
          return res.status(400).json({ msg: "❌ La fecha y la hora son obligatorias." });
      }

      if (!usuarioId) { 
        if (!email || !telefono) {
            return res.status(400).json({ msg: "❌ El correo y teléfono son obligatorios para usuarios no registrados." });
        }
      }

      // Combinar fecha y hora correctamente antes de guardarla
      const fechaHora = new Date(`${fecha}T${hora}:00`);
      console.log("📅 Fecha y Hora guardada en la BD:", fechaHora);

      const nuevaCita = await Cita.create({
          usuarioId: usuarioId ? usuarioId : null,
          fecha: fechaHora, // Guardamos la fecha y la hora correctamente
          email: usuarioId ? null : email,  
          telefono: usuarioId ? null : telefono, 
          estado: 'pendiente'
      });

      res.status(201).json({ msg: "✅ Cita creada con éxito", cita: nuevaCita });

  } catch (error) {
      console.error("❌ Error en createCita:", error);
      res.status(500).json({ msg: "❌ Error al solicitar la cita", error: error.message });
  }
};

exports.obtenerCitasPorUsuario = async (req, res) => {
  try {
      const { usuarioId } = req.params;

      if (!usuarioId) {
          return res.status(400).json({ msg: "❌ Usuario ID es obligatorio" });
      }

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