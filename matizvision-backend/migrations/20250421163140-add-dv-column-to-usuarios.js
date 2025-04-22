'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Si la columna ya existe y solo querés asegurarte de que no sea null
    await queryInterface.changeColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Si querés revertir el cambio y permitir null otra vez
    await queryInterface.changeColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};