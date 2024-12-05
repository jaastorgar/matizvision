const express = require('express');
const upload = require('../middleware/upload');
const productController = require('./controllers/productController');

const router = express.Router();

// Ruta para subir la foto del producto
router.post('/upload/:id', upload.single('photo'), productController.uploadPhoto);

module.exports = router;