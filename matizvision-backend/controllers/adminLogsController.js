const { AdminLogs, Usuario } = require('../models');

exports.getAllLogs = async (req, res) => {
    try {
        const logs = await AdminLogs.findAll({ include: Usuario });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener logs", error });
    }
};

exports.createLog = async (req, res) => {
    try {
        const { adminId, accion } = req.body;
        const log = await AdminLogs.create({ adminId, accion });
        res.status(201).json({ msg: "Acción registrada", log });
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar acción", error });
    }
};