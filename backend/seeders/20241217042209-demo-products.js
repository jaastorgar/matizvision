'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Lente Moderno',
        description: 'Lente con diseño moderno y resistente.',
        price: 49990,
        stock: 20,
        category: 'Lentes',
        image_url: '/uploads/products/lente1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lente Clásico',
        description: 'Lente con estilo clásico y duradero.',
        price: 39990,
        stock: 15,
        category: 'Lentes',
        image_url: '/uploads/products/lente2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};