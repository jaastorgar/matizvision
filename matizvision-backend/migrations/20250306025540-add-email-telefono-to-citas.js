module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Cita", "email", {
      type: Sequelize.STRING,
      allowNull: true, // ✅ Permitimos valores nulos para usuarios autenticados
    });

    await queryInterface.addColumn("Cita", "telefono", {
      type: Sequelize.STRING,
      allowNull: false, // ✅ Teléfono es obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Cita", "email");
    await queryInterface.removeColumn("Cita", "telefono");
  },
};