'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // Nombre de la tabla relacionada
        key: 'id',      // Llave primaria de la tabla relacionada
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Products', 'user_id');
  },
};