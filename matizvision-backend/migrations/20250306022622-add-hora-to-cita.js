module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cita', 'hora', {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: '00:00:00'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cita', 'hora');
  }
};