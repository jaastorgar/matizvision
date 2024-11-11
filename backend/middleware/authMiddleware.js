// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  // Obtén el token del encabezado 'Authorization'
  const token = req.headers['authorization'];

  // Verifica si el token está presente
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  // Verifica y decodifica el token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }
    // Agrega el ID y el rol del usuario al objeto de solicitud
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next(); // Continúa con la siguiente función en la ruta
  });
};

module.exports = verifyToken;