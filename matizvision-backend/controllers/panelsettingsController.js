const PanelSettings = require('../models/panelsettings');

// Obtener todas las configuraciones
exports.getAllSettings = async (req, res) => {
    try {
        console.log("📌 Obteniendo todas las configuraciones...");
        const settings = await PanelSettings.findAll();
        res.json(settings);
    } catch (error) {
        console.error('❌ Error al obtener configuraciones:', error);
        res.status(500).json({ msg: "Error al obtener configuraciones" });
    }
};

// Obtener configuración por clave
exports.getSettingByKey = async (req, res) => {
    try {
        console.log(`📌 Buscando configuración con clave: ${req.params.key}`);
        const setting = await PanelSettings.findOne({ where: { setting_key: req.params.key } });
        if (!setting) return res.status(404).json({ msg: "Configuración no encontrada" });

        res.json(setting);
    } catch (error) {
        console.error('❌ Error al obtener configuración:', error);
        res.status(500).json({ msg: "Error al obtener configuración" });
    }
};

// Crear nueva configuración
exports.createSetting = async (req, res) => {
    try {
        const { setting_key, setting_value } = req.body;

        if (!setting_key || !setting_value) {
            return res.status(400).json({ msg: "Faltan datos requeridos" });
        }

        console.log("📌 Creando nueva configuración:", setting_key, setting_value);
        const setting = await PanelSettings.create({ setting_key, setting_value });
        res.status(201).json(setting);
    } catch (error) {
        console.error('❌ Error al crear configuración:', error);
        res.status(500).json({ msg: "Error al crear configuración" });
    }
};

// Actualizar configuración por clave
exports.updateSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const { setting_value } = req.body;

        if (!setting_value) {
            return res.status(400).json({ msg: "El valor de la configuración es obligatorio" });
        }

        console.log(`📌 Actualizando configuración: ${key} -> ${setting_value}`);
        const setting = await PanelSettings.findOne({ where: { setting_key: key } });

        if (!setting) {
            return res.status(404).json({ msg: "Configuración no encontrada" });
        }

        setting.setting_value = setting_value;
        await setting.save();

        res.json({ msg: "Configuración actualizada correctamente", setting });
    } catch (error) {
        console.error('❌ Error al actualizar configuración:', error);
        res.status(500).json({ msg: "Error al actualizar configuración" });
    }
};

// Eliminar configuración por clave
exports.deleteSetting = async (req, res) => {
    try {
        const { key } = req.params;
        console.log(`🗑️ Eliminando configuración con clave: ${key}`);

        const setting = await PanelSettings.findOne({ where: { setting_key: key } });

        if (!setting) {
            return res.status(404).json({ msg: "Configuración no encontrada" });
        }

        await setting.destroy();
        res.json({ msg: "Configuración eliminada correctamente" });
    } catch (error) {
        console.error('❌ Error al eliminar configuración:', error);
        res.status(500).json({ msg: "Error al eliminar configuración" });
    }
};