const { Cita, Usuario } = require('../models');

exports.getAllCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({ include: Usuario });
        res.json(citas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener citas", error });
    }
};

exports.createCita = async (req, res) => {
    try {
        const { usuarioId, fecha } = req.body;
        const cita = await Cita.create({ usuarioId, fecha, estado: 'pendiente' });
        res.status(201).json({ msg: "Cita creada con éxito", cita });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear cita", error });
    }
};

exports.updateCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        await Cita.update({ estado }, { where: { id } });
        res.json({ msg: "Cita actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar cita", error });
    }
};

exports.deleteCita = async (req, res) => {
    try {
        const { id } = req.params;
        await Cita.destroy({ where: { id } });
        res.json({ msg: "Cita eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar cita", error });
    }
};