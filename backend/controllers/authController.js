const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Login para usuarios regulares
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verificar que tenga un valor
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET, // Clave secreta desde el entorno
      { expiresIn: '1h' }
    );

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error en login de usuario:', error.message);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { loginUser };