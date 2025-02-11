const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: "Acceso denegado, token requerido" });

    try {
        const tokenSplit = token.split(" ");
        if (tokenSplit.length !== 2 || tokenSplit[0] !== "Bearer") {
            return res.status(400).json({ msg: "Formato de token inválido" });
        }

        const decoded = jwt.verify(tokenSplit[1], process.env.JWT_SECRET);
        req.user = decoded;

        // ⚠️ Permitir que todos los usuarios autenticados accedan
        next();

    } catch (error) {
        res.status(400).json({ msg: "Token inválido" });
    }
};