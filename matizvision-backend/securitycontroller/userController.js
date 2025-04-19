const { Usuario } = require('../models');

// Validaciones personalizadas
const validarEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validarTelefono = (telefono) => /^[0-9]{8,12}$/.test(telefono);
const validarRut = (rut) => /^[0-9]{7,9}$/.test(rut);
const validarDv = (dv) => /^[0-9kK]{1}$/.test(dv);

exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['password'] } });
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

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

exports.updateUser = async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, email, telefono, rut, dv } = req.body;
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Validaciones básicas
    if (!nombre || !apellido_paterno || !apellido_materno) {
      return res.status(400).json({ msg: "Los campos de nombre y apellidos son obligatorios" });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "Correo electrónico inválido" });
    }

    if (!validarTelefono(telefono)) {
      return res.status(400).json({ msg: "Teléfono inválido. Debe tener entre 8 y 12 dígitos" });
    }

    if (!validarRut(rut)) {
      return res.status(400).json({ msg: "El RUT debe tener entre 7 y 9 dígitos (sin puntos ni guión)" });
    }

    if (!validarDv(dv)) {
      return res.status(400).json({ msg: "Dígito verificador inválido" });
    }

    // Actualizar campos
    usuario.nombre = nombre;
    usuario.apellido_paterno = apellido_paterno;
    usuario.apellido_materno = apellido_materno;
    usuario.email = email;
    usuario.telefono = telefono;
    usuario.rut = rut;
    usuario.dv = dv;

    await usuario.save();

    res.json({ msg: "✅ Usuario actualizado correctamente", usuario });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

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