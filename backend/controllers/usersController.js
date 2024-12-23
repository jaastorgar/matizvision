const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    console.log('Archivo recibido:', req.file);

    const user = await User.create({
      ...req.body,
      role: req.body.role || 'cliente', // Valor predeterminado
      profile_picture: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(400).json({ error: 'Error al registrar usuario', details: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  registerUser,
};