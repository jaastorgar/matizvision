const express = require('express');
const upload = require('../middleware/upload');
const userController = require('../Controllers/userController');

const router = express.Router();

// Crear un usuario
router.post('/', userController.createUser);

// Subir una foto para el usuario
router.post('/upload/:id', upload.single('photo'), userController.uploadPhoto);

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Actualizar un usuario
router.put('/:id', userController.updateUser);

// Eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;