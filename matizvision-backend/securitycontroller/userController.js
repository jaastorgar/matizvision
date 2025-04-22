const { Usuario, AdminLog } = require('../models');
const bcrypt = require('bcrypt');

// Validaciones personalizadas
const validarEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validarTelefono = (telefono) => /^[0-9]{8,12}$/.test(telefono);
const validarRut = (rut) => /^[0-9]{7,9}$/.test(rut);
const validarDV = (dv) => /^[0-9Kk]$/.test(dv); // acepta 0-9 o K/k

// 🔹 Crear nuevo usuario (solo admin)
exports.crearUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      telefono,
      rut,
      dv,
      password,
      rol,
    } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido_paterno || !apellido_materno || !email || !telefono || !rut || !dv || !password || !rol) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "Correo electrónico inválido" });
    }

    if (!validarTelefono(telefono)) {
      return res.status(400).json({ msg: "Teléfono inválido" });
    }

    if (!validarRut(rut)) {
      return res.status(400).json({ msg: "RUT inválido" });
    }

    if (!validarDV(dv)) {
      return res.status(400).json({ msg: "Dígito verificador (DV) inválido. Debe ser 0-9 o 'K'" });
    }

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ msg: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      telefono,
      rut,
      dv: dv.toUpperCase(), // guardamos DV en mayúscula por consistencia
      password: hashedPassword,
      rol,
    });

    res.status(201).json({ msg: "✅ Usuario creado correctamente", usuario: nuevoUsuario });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

// 🔹 Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['password'] } });
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

// 🔹 Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("❌ Error al buscar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

// 🔹 Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      telefono,
      rut,
      dv
    } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (!nombre || !apellido_paterno || !apellido_materno || !email || !telefono || !rut || !dv) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "Correo electrónico inválido" });
    }

    if (!validarTelefono(telefono)) {
      return res.status(400).json({ msg: "Teléfono inválido" });
    }

    if (!validarRut(rut)) {
      return res.status(400).json({ msg: "RUT inválido" });
    }

    if (!validarDV(dv)) {
      return res.status(400).json({ msg: "Dígito verificador (DV) inválido. Debe ser 0-9 o 'K'" });
    }

    usuario.nombre = nombre;
    usuario.apellido_paterno = apellido_paterno;
    usuario.apellido_materno = apellido_materno;
    usuario.email = email;
    usuario.telefono = telefono;
    usuario.rut = rut;
    usuario.dv = dv.toUpperCase();

    await usuario.save();

    res.json({ msg: "✅ Usuario actualizado correctamente", usuario });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

// 🔹 Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await usuario.destroy();
    
    res.json({ msg: "✅ Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};