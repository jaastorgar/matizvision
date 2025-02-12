module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cita', 'hora', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Cita', 'email', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Cita', 'telefono', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cita', 'hora');
    await queryInterface.removeColumn('Cita', 'email');
    await queryInterface.removeColumn('Cita', 'telefono');
  }
};