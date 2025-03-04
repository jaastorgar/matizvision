const { AdminLogs, Usuario } = require('../models');

const getAdminLogs = async (req, res) => {
    try {
        const logs = await AdminLogs.findAll({
            include: { model: Usuario, attributes: ['nombre', 'apellido'] },
            order: [['fecha', 'DESC']]
        });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los logs administrativos' });
    }
};

const createAdminLog = async (req, res) => {
    const { adminId, accion } = req.body;

    if (!adminId || !accion) {
        return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    try {
        const log = await AdminLogs.create({ adminId, accion });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar la acción' });
    }
};

const getAdminLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await AdminLogs.findByPk(id, {
            include: { model: Usuario, attributes: ['nombre', 'apellido'] }
        });

        if (!log) return res.status(404).json({ msg: 'Log no encontrado' });

        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el log' });
    }
};

const deleteAdminLog = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await AdminLogs.findByPk(id);
        if (!log) return res.status(404).json({ msg: 'Log no encontrado' });

        await log.destroy();
        res.status(200).json({ msg: 'Log eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el log' });
    }
};

module.exports = {
    getAdminLogs,
    createAdminLog,
    getAdminLogById,
    deleteAdminLog
};