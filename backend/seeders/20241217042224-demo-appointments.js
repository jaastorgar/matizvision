'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        user_id: 1,
        date: '2024-12-20',
        time: '10:00:00',
        service_type: 'Consulta Visual',
        status: 'pendiente',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  },
};