const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('matizvision', 'postgres', 'Mamita10.', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('¡Conexión exitosa con la base de datos!');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await sequelize.close();
  }
})();