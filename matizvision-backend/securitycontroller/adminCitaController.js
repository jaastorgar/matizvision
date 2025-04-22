const { Cita, Usuario, AdminLog } = require("../models");

// 📌 Obtener todas las citas con la información del cliente
exports.obtenerCitasAdmin = async (req, res) => {
  try {
    const citas = await Cita.findAll({
      include: [
        {
          model: Usuario,
          as: "cliente",
          attributes: ["nombre", "telefono"],
        },
      ],
    });

    if (!citas || citas.length === 0) {
      return res.status(404).json({ message: "No hay citas disponibles." });
    }

    const citasConCliente = citas.map((cita) => ({
      id: cita.id,
      fecha: cita.fecha,
      estado: cita.estado,
      clienteNombre: cita.cliente ? cita.cliente.nombre : "No asignado",
      clienteTelefono: cita.cliente ? cita.cliente.telefono : "No disponible",
    }));

    res.json(citasConCliente);
  } catch (error) {
    console.error("❌ Error al obtener citas:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// 📌 Crear una nueva cita (Solo Admin)
exports.crearCitaAdmin = async (req, res) => {
  try {
    const { usuarioId, fecha, estado } = req.body;

    if (!usuarioId || !fecha || !estado) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const nuevaCita = await Cita.create({ usuarioId, fecha, estado });

    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error("❌ Error al crear la cita:", error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

// 📌 Actualizar una cita (Solo Admin)
exports.actualizarCitaAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, estado } = req.body;

    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    await cita.update({ fecha, estado });

    res.json({ message: "Cita actualizada correctamente", cita });
  } catch (error) {
    console.error("❌ Error al actualizar la cita:", error);
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};

// 📌 Eliminar una cita (Solo Admin)
exports.eliminarCitaAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByPk(id);
    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    await cita.destroy();

    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar la cita:", error);
    res.status(500).json({ message: "Error al eliminar la cita" });
  }
};