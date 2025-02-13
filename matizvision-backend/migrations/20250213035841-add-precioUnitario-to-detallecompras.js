'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('DetalleCompras', 'precioUnitario', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DetalleCompras', 'precioUnitario');
  }
};