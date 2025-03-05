const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { getProfile } = require('../controllers/authController'); 

// Rutas
router.post('/register', async (req, res) => {
    console.log("📩 Intento de registro con datos:", req.body);
    await authController.register(req, res);
});

router.post('/login', async (req, res) => {
    console.log("🔑 Intento de inicio de sesión con correo:", req.body.email);
    await authController.login(req, res);
});

router.get("/profile", verifyToken, async (req, res) => {
    console.log("🔍 Verificando perfil del usuario con ID:", req.user.id);
    try {
        const profile = await getProfile(req, res);
        console.log("✅ Perfil obtenido correctamente:", profile);
    } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
    }
});

module.exports = router;