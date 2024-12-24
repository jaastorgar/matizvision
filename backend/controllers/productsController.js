const { Product } = require('../models');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener todos los productos');
    const products = await Product.findAll();
    console.log('Productos recuperados:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    console.log('Datos recibidos para crear producto:', req.body);
    const product = await Product.create(req.body);
    console.log('Producto creado:', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
};