const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación no proporcionado.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Error en la autenticación:', error.message);
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = authenticateUser;