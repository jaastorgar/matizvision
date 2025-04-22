const express = require('express');
const router = express.Router();
const userController = require('../securitycontroller/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// 🔍 Obtener todos los usuarios (solo admin)
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// 🔍 Obtener usuario por ID (solo admin)
router.get('/:id', verifyToken, isAdmin, userController.getUserById);

// ✏ Actualizar usuario (solo admin)
router.put('/:id', verifyToken, isAdmin, userController.updateUser);

// 🗑 Eliminar usuario (solo admin)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

// 🆕 Crear usuario (solo admin)
router.post('/', verifyToken, isAdmin, userController.crearUsuario);

module.exports = router;