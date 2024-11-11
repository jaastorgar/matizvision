// userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Asegúrate de que esta ruta es correcta
const verifyToken = require('../middleware/authMiddleware'); // Middleware de autenticación, si lo estás usando
const router = express.Router();

// Rutas públicas
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Rutas protegidas
router.get('/', verifyToken, userController.getUsers); // Asegúrate de que getUsers está definido en userController
router.put('/:id', verifyToken, userController.updateUser); // Asegúrate de que updateUser está definido
router.delete('/:id', verifyToken, userController.deleteUser); // Asegúrate de que deleteUser está definido

module.exports = router;