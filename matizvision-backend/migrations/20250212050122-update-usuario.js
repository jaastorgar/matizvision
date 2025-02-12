module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Usuarios', 'telefono', { 
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Usuarios', 'telefono');
  }
};