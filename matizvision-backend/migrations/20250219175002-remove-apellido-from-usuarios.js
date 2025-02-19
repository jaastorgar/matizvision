module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'apellido'); // ✅ Eliminar el campo apellido
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'apellido', {
      type: Sequelize.STRING,
      allowNull: true // Si se revierte la migración, el campo volverá pero opcional.
    });
  }
};