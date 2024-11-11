const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Rutas públicas
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Rutas protegidas
router.get('/', verifyToken, userController.getUsers);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;