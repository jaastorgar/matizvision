'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Usuarios', 'rut', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Usuarios', 'rol', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'cliente',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Opcional: revertir los cambios si se necesita
    await queryInterface.changeColumn('Usuarios', 'rut', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Usuarios', 'rol', {
      type: Sequelize.STRING,
    });
  }
};