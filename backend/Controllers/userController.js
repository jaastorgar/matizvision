const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Busca el usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Crear un usuario
exports.createUser = async (req, res) => {
  try {
    const { name, lastName, rut, dv, email, password, age, birthDate, role } = req.body;

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastName,
      rut,
      dv,
      email,
      password: hashedPassword,
      age,
      birthDate,
      photo: '/uploads/users/default.jpg',
      role: role || 'cliente',
    });

    res.status(201).json({ message: 'Usuario creado con éxito', user });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Subir foto del usuario
exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.params.id; // ID del usuario desde la URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica si ya tiene una foto y elimina la anterior si no es la predeterminada
    if (user.photo && user.photo !== '/uploads/users/default.jpg') {
      const oldPath = path.join(__dirname, '..', user.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Elimina la foto anterior
      }
    }

    // Asigna la nueva ruta al campo photo
    const photoPath = `/uploads/users/${req.file.filename}`;
    user.photo = photoPath;

    await user.save(); // Guarda los cambios en la base de datos
    res.status(200).json({ message: 'Foto actualizada con éxito', photo: photoPath });
  } catch (error) {
    console.error('Error al cargar la foto:', error);
    res.status(500).json({ message: 'Error al cargar la foto', error });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, lastName, rut, dv, age, birthDate, role } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.rut = rut || user.rut;
    user.dv = dv || user.dv;
    user.age = age || user.age;
    user.birthDate = birthDate || user.birthDate;
    user.role = role || user.role;

    await user.save();

    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};