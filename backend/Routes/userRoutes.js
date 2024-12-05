const express = require('express');
const upload = require('../middleware/upload');
const userController = require('./controllers/userController');

const router = express.Router();

// Ruta para subir la foto
router.post('/upload/:id', upload.single('photo'), userController.uploadPhoto);

module.exports = router;