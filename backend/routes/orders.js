const express = require('express');
const { getAllOrders, createOrder } = require('../controllers/ordersController');

const router = express.Router();

// Obtener todas las órdenes
router.get('/', getAllOrders);

// Crear una nueva orden
router.post('/', createOrder);

module.exports = router;