const { AdminLogs, Usuario } = require('../models');

const getAdminLogs = async (req, res) => {
    try {
        console.log("📌 Solicitando logs administrativos...");
        const logs = await AdminLogs.findAll({
            include: { 
                model: Usuario, 
                attributes: ['nombre', 'apellido_paterno', 'apellido_materno']  // Corregir atributos
            },
            order: [['fecha', 'DESC']]
        });
        console.log("✅ Logs obtenidos correctamente:", logs);
        res.status(200).json(logs);
    } catch (error) {
        console.error("❌ Error al obtener los logs administrativos:", error);
        res.status(500).json({ msg: 'Error al obtener los logs administrativos' });
    }
};

const createAdminLog = async (req, res) => {
    const { adminId, accion } = req.body;

    if (!adminId || !accion) {
        console.warn("⚠️ Datos faltantes al intentar crear un log:", { adminId, accion });
        return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    try {
        console.log("📌 Creando nuevo log con datos:", { adminId, accion });
        const log = await AdminLogs.create({ adminId, accion });
        console.log("✅ Log creado exitosamente:", log);
        res.status(201).json(log);
    } catch (error) {
        console.error("❌ Error al registrar la acción:", error);
        res.status(500).json({ msg: 'Error al registrar la acción' });
    }
};

const getAdminLogById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`📌 Buscando log con ID: ${id}`);
        const log = await AdminLogs.findByPk(id, {
            include: { model: Usuario, attributes: ['nombre', 'apellido'] }
        });

        if (!log) {
            console.warn(`⚠️ Log con ID ${id} no encontrado`);
            return res.status(404).json({ msg: 'Log no encontrado' });
        }

        console.log("✅ Log encontrado:", log);
        res.status(200).json(log);
    } catch (error) {
        console.error("❌ Error al obtener el log:", error);
        res.status(500).json({ msg: 'Error al obtener el log' });
    }
};

const deleteAdminLog = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`📌 Eliminando log con ID: ${id}`);
        const log = await AdminLogs.findByPk(id);
        if (!log) {
            console.warn(`⚠️ Log con ID ${id} no encontrado para eliminación`);
            return res.status(404).json({ msg: 'Log no encontrado' });
        }

        await log.destroy();
        console.log("✅ Log eliminado correctamente");
        res.status(200).json({ msg: 'Log eliminado correctamente' });
    } catch (error) {
        console.error("❌ Error al eliminar el log:", error);
        res.status(500).json({ msg: 'Error al eliminar el log' });
    }
};

module.exports = {
    getAdminLogs,
    createAdminLog,
    getAdminLogById,
    deleteAdminLog
};