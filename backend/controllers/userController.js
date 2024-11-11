// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const { name, rut, dv, phone, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      rut,
      dv,
      phone,
      email,
      password: hashedPassword,
      role: 'cliente',
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Datos recibidos en la solicitud:", { email, password }); // Añade este log para ver los datos recibidos

    // Busca el usuario por correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("Usuario no encontrado"); // Añade este log para ver si el usuario existe
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Contraseña incorrecta"); // Añade este log para verificar la contraseña
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error); // Esto mostrará detalles del error en la consola
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los usuarios (protegido)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Actualizar un usuario por ID (protegido)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario por ID (protegido)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.destroy();
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token no válido' });
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['name', 'email', 'rut', 'dv', 'phone']
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el perfil del usuario' });
  }
};