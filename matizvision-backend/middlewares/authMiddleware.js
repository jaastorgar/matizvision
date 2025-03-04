const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Usuario } = require('../models');

// Middleware para verificar autenticación
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: "Acceso denegado, token requerido" });

    try {
        const tokenSplit = token.split(" ");
        if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer") {
            return res.status(400).json({ msg: "Formato de token inválido" });
        }

        const decoded = jwt.verify(tokenSplit[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Token inválido" });
    }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
    try {
        const user = await Usuario.findByPk(req.user.id);
        if (!user || user.rol !== 'admin') {
            return res.status(403).json({ msg: "Acceso denegado. Se requieren permisos de administrador." });
        }
        next();
    } catch (error) {
        res.status(500).json({ msg: "Error en la validación del rol" });
    }
};

module.exports = { verifyToken, isAdmin };