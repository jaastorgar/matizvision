const { User } = require('../models');
const bcrypt = require('bcrypt');

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
  const { email, password, ...rest } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const profilePicturePath = req.file ? req.file.path : null; // Obtener solo la ruta
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      email,
      password: hashedPassword,
      profile_picture: profilePicturePath, // Guardar como string
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  registerUser,
  deleteUser,
};