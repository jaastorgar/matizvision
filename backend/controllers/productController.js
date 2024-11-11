// controllers/productController.js
const Product = require('../models/Product');

// Crear producto
exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = await Product.create({ name, description, price, stock, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    await product.destroy();
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};