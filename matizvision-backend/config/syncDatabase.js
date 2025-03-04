const { sequelize } = require('../models');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('✅ Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('❌ Error al sincronizar la base de datos:', error);
    }
}

syncDatabase();