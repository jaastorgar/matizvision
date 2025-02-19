module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'rut', {
      type: Sequelize.STRING,
      allowNull: true // Permite valores nulos temporalmente
    });
    await queryInterface.addColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Usuarios', 'apellido_paterno', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Usuarios', 'apellido_materno', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Actualiza todos los usuarios existentes con un valor por defecto
    await queryInterface.sequelize.query(`
      UPDATE "Usuarios"
      SET rut = '00000000', dv = '0', apellido_paterno = 'Desconocido', apellido_materno = 'Desconocido'
      WHERE rut IS NULL;
    `);

    // Modifica las columnas para que ya no permitan NULL después de actualizar
    await queryInterface.changeColumn('Usuarios', 'rut', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Usuarios', 'dv', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Usuarios', 'apellido_paterno', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('Usuarios', 'apellido_materno', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'rut');
    await queryInterface.removeColumn('Usuarios', 'dv');
    await queryInterface.removeColumn('Usuarios', 'apellido_paterno');
    await queryInterface.removeColumn('Usuarios', 'apellido_materno');
  }
};