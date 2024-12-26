const express = require('express');
const { loginUser, loginAdmin, registerAdminController } = require('../controllers/authController');
const upload = require('../Middlewares/Middleware');

const router = express.Router();

// Endpoint para iniciar sesión
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);
router.post('/register-admin', upload.single('profile_picture'), registerAdminController);

module.exports = router;