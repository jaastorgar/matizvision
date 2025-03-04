const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PanelSettings extends Model {}

PanelSettings.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    setting_value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'PanelSettings',
    tableName: 'panelsettings',
    timestamps: false
});

module.exports = PanelSettings;