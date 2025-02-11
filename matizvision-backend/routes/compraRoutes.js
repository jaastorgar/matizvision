const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, compraController.getAllCompras);
router.post('/', authMiddleware, compraController.createCompra);
router.put('/:id', authMiddleware, compraController.updateCompra);

module.exports = router;