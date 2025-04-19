const { Cita } = require('../models');

// ✅ Validadores manuales
const esFechaValida = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return !isNaN(fecha.getTime());
};

const esEmailValido = (email) => /^\S+@\S+\.\S+$/.test(email);
const esTelefonoValido = (tel) => /^[0-9]{8,12}$/.test(tel);

exports.createCita = async (req, res) => {
  try {
      const { fecha, hora, usuarioId, email, telefono } = req.body;

      // Validar fecha y hora obligatorias
      if (!fecha || !hora) {
          return res.status(400).json({ msg: "❌ La fecha y la hora son obligatorias." });
      }

      // Validar que la fecha sea válida
      const fechaHoraStr = `${fecha}T${hora}:00`;
      if (!esFechaValida(fechaHoraStr)) {
          return res.status(400).json({ msg: "❌ La fecha u hora no tienen un formato válido." });
      }

      const fechaHora = new Date(fechaHoraStr);

      // Validar que la cita no sea en el pasado
      const ahora = new Date();
      if (fechaHora < ahora) {
          return res.status(400).json({ msg: "❌ No puedes agendar una cita en el pasado." });
      }

      // Si no hay usuarioId → usuario anónimo → validar email y teléfono
      if (!usuarioId) {
          if (!email || !telefono) {
              return res.status(400).json({ msg: "❌ El correo y teléfono son obligatorios para usuarios no registrados." });
          }

          if (!esEmailValido(email)) {
              return res.status(400).json({ msg: "❌ El correo electrónico no es válido." });
          }

          if (!esTelefonoValido(telefono)) {
              return res.status(400).json({ msg: "❌ El número de teléfono debe tener entre 8 y 12 dígitos." });
          }
      }

      // Crear la cita
      const nuevaCita = await Cita.create({
          usuarioId: usuarioId || null,
          fecha: fechaHora,
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