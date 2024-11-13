// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;