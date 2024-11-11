const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no encontrado, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Esto añade el ID del usuario a req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido, autorización denegada' });
  }
};

module.exports = verifyToken;