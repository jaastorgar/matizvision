const express = require('express');
const upload = require('../middleware/upload'); // Middleware para la subida de archivos
const productController = require('../Controllers/productController');

const router = express.Router();

// Crear un producto
router.post('/', productController.createProduct);

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Actualizar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

// Subir la foto del producto
router.post('/upload/:id', upload.single('photo'), productController.uploadPhoto);

module.exports = router;