'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Javier',
        last_name: 'Pérez',
        email: 'javier@example.com',
        password: 'hashed_password', // Cambia esto por un hash real
        role: 'cliente',
        rut: '12345678',
        dv: '9',
        age: 25,
        birth_date: '1998-01-01',
        profile_picture: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Admin',
        last_name: 'Optica',
        email: 'admin@example.com',
        password: 'hashed_password', // Cambia esto por un hash real
        role: 'admin',
        rut: '87654321',
        dv: 'K',
        age: 40,
        birth_date: '1983-06-15',
        profile_picture: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};