module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Productos", "nombre", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Productos", "descripcion", {
        type: Sequelize.TEXT,
        allowNull: false,
      }),
      queryInterface.changeColumn("Productos", "precio", {
        type: Sequelize.FLOAT,
        allowNull: false,
      }),
      queryInterface.changeColumn("Productos", "stock", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Productos", "imagen", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Productos", "nombre", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Productos", "descripcion", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Productos", "precio", {
        type: Sequelize.FLOAT,
        allowNull: true,
      }),
      queryInterface.changeColumn("Productos", "stock", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Productos", "imagen", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};