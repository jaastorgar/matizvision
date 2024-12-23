const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// Endpoint para iniciar sesión
router.post('/login', loginUser);

module.exports = router;