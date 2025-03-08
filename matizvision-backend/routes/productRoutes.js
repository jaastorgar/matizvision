const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // ✅ Importamos las funciones correctas

// Manejar preflight de CORS
router.options('*', (req, res) => res.sendStatus(200));

// ✅ Agregar logs para verificar que las rutas funcionan
router.use((req, res, next) => {
    console.log(`🔍 Recibida petición: ${req.method} ${req.originalUrl}`);
    next();
});

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas (solo admins pueden crear, actualizar y eliminar productos)
router.post('/', verifyToken, isAdmin, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;