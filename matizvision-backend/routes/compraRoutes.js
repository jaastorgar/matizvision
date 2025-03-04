const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas para compras
router.get('/:usuarioId', verifyToken, compraController.obtenerComprasPorUsuario);
router.post('/', verifyToken, compraController.createCompra);
router.put('/:id', verifyToken, compraController.updateCompra);

module.exports = router;