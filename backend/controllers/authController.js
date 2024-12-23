const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, last_name, email, password, rut, dv, age, birth_date, profile_picture } = req.body;

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await User.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      rut,
      dv,
      age,
      birth_date,
      profile_picture: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(400).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1d' }
    );

    // Responder con los datos del usuario y el token
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};