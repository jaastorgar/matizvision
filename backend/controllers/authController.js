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

// Login para administradores
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, role: 'admin' } });

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado o no es administrador.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role, email: user.email });
  } catch (error) {
    console.error('Error en login de administrador:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Registro de administradores
const registerAdminController = async (req, res) => {
  try {
    const { name, last_name, email, password, rut, dv, age, birth_date } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    if (!name || !last_name || !email || !password || !rut || !dv || !age || !birth_date) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const existingAdmin = await User.findOne({ where: { email } });

    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      last_name,
      email,
      password: hashedPassword,
      rut,
      dv,
      age,
      birth_date,
      role: 'admin',
      profile_picture,
    });

    res.status(201).json({ message: 'Administrador creado exitosamente.', data: newAdmin });
  } catch (error) {
    console.error('Error al registrar administrador:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { loginUser, loginAdmin, registerAdminController };