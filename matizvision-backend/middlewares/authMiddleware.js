const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Usuario } = require('../models');

// Middleware para verificar autenticación
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("🔍 Verificando token recibido:", token);

    if (!token) {
        console.warn("⚠️ Token no proporcionado");
        return res.status(401).json({ msg: "Acceso denegado, token requerido" });
    }

    try {
        const tokenSplit = token.split(" ");
        if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer") {
            console.warn("⚠️ Formato de token inválido");
            return res.status(400).json({ msg: "Formato de token inválido" });
        }

        const decoded = jwt.verify(tokenSplit[1], process.env.JWT_SECRET);
        console.log("✅ Token decodificado correctamente:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.error("❌ Token expirado:", error.expiredAt);
            return res.status(401).json({ msg: "Token expirado" });
        }
        console.error("❌ Error al verificar token:", error);
        res.status(400).json({ msg: "Token inválido" });
    }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
    try {
        console.log("🔍 Verificando si el usuario es admin, ID:", req.user.id);
        const user = await Usuario.findByPk(req.user.id);
        if (!user || user.rol !== 'admin') {
            console.warn("⚠️ Usuario sin permisos de administrador");
            return res.status(403).json({ msg: "Acceso denegado. Se requieren permisos de administrador." });
        }
        console.log("✅ Usuario es administrador");
        next();
    } catch (error) {
        console.error("❌ Error en la validación del rol:", error);
        res.status(500).json({ msg: "Error en la validación del rol" });
    }
};

module.exports = { verifyToken, isAdmin };