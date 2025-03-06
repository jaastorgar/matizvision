module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Cita", "email", {
      type: Sequelize.STRING,
      allowNull: true, // ✅ Ahora puede ser NULL
    });

    await queryInterface.changeColumn("Cita", "telefono", {
      type: Sequelize.STRING,
      allowNull: true, // ✅ Ahora puede ser NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Cita", "email", {
      type: Sequelize.STRING,
      allowNull: false, // ❌ En caso de revertir, vuelve a ser obligatorio
    });

    await queryInterface.changeColumn("Cita", "telefono", {
      type: Sequelize.STRING,
      allowNull: false, // ❌ En caso de revertir, vuelve a ser obligatorio
    });
  },
};