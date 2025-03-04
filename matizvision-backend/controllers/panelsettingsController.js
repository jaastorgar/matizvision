const { PanelSettings } = require('../models');

const getAllSettings = async (req, res) => {
    try {
        const settings = await PanelSettings.findAll();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las configuraciones' });
    }
};

const getSettingByKey = async (req, res) => {
    const { key } = req.params;
    try {
        const setting = await PanelSettings.findOne({ where: { setting_key: key } });
        if (!setting) return res.status(404).json({ msg: 'Configuración no encontrada' });

        res.status(200).json(setting);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener la configuración' });
    }
};

const createSetting = async (req, res) => {
    const { setting_key, setting_value } = req.body;

    if (!setting_key || !setting_value) {
        return res.status(400).json({ msg: 'Faltan datos requeridos' });
    }

    try {
        const setting = await PanelSettings.create({ setting_key, setting_value });
        res.status(201).json(setting);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear la configuración' });
    }
};

const updateSetting = async (req, res) => {
    const { key } = req.params;
    const { setting_value } = req.body;

    try {
        const setting = await PanelSettings.findOne({ where: { setting_key: key } });
        if (!setting) return res.status(404).json({ msg: 'Configuración no encontrada' });

        setting.setting_value = setting_value;
        await setting.save();
        res.status(200).json({ msg: 'Configuración actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la configuración' });
    }
};

const deleteSetting = async (req, res) => {
    const { key } = req.params;

    try {
        const setting = await PanelSettings.findOne({ where: { setting_key: key } });
        if (!setting) return res.status(404).json({ msg: 'Configuración no encontrada' });

        await setting.destroy();
        res.status(200).json({ msg: 'Configuración eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar la configuración' });
    }
};

module.exports = {
    getAllSettings,
    getSettingByKey,
    createSetting,
    updateSetting,
    deleteSetting
};