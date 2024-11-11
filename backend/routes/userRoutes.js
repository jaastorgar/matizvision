const express = require('express');
const userController = require('../controllers/userController'); // Asegúrate de que esta ruta es correcta
const verifyToken = require('../middleware/authMiddleware'); // Middleware de autenticación
const router = express.Router();

// Rutas públicas
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/me', verifyToken, userController.getUserProfile); // Asegúrate de que getUserProfile está definido en userController

// Otras rutas protegidas
router.get('/', verifyToken, userController.getUsers); // Asegúrate de que getUsers está definido
router.put('/:id', verifyToken, userController.updateUser); // Asegúrate de que updateUser está definido
router.delete('/:id', verifyToken, userController.deleteUser); // Asegúrate de que deleteUser está definido

module.exports = router;