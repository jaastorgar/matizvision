const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/authController'); 

// Rutas
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/profile", verifyToken, getProfile);

module.exports = router;