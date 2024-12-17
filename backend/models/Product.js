const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre del producto no puede estar vacío' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: 'El precio debe ser un número válido' },
        min: { args: [0], msg: 'El precio no puede ser negativo' },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'El stock debe ser un número entero' },
        min: { args: [0], msg: 'El stock no puede ser negativo' },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '/uploads/products/default.jpg',
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
  });

  return Product;
};