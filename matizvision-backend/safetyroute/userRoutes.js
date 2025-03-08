const express = require('express');
const router = express.Router();
const userController = require('../securitycontroller/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Middleware de autenticación

// 🔍 Obtener todos los usuarios (solo admin)
router.get('/', verifyToken, isAdmin, userController.getAllUsuarios);

// 🔍 Obtener usuario por ID (solo admin)
router.get('/:id', verifyToken, isAdmin, userController.getUsuarioById);

// ✏ Actualizar usuario (solo admin)
router.put('/:id', verifyToken, isAdmin, userController.updateUsuario);

// 🗑 Eliminar usuario (solo admin)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUsuario);

module.exports = router;