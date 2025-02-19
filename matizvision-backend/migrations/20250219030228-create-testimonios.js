module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Testimonios", {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
          },
          usuarioId: {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                  model: "Usuarios",
                  key: "id",
              },
              onDelete: "CASCADE",
          },
          nombre: {
              type: Sequelize.STRING,
              allowNull: true,
          },
          comentario: {
              type: Sequelize.TEXT,
              allowNull: false,
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
              type: Sequelize.DATE,
              allowNull: false,
              defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Testimonios");
  },
};