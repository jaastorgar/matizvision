const express = require('express');
const { getAllUsers, createUser } = require('../controllers/usersController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Crear un nuevo usuario
router.post('/', createUser);

module.exports = router;