const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productsController');

const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Crear un nuevo producto
router.post('/', createProduct);

module.exports = router;