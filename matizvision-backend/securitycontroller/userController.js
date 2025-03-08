const Usuario = require('../models/usuario');

// ✅ Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        console.log("👤 Usuarios obtenidos:", usuarios);
        res.json(usuarios);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ error: "No se pudieron obtener los usuarios." });
    }
};

// ✅ Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        console.log("👤 Usuario obtenido:", usuario);
        res.json(usuario);
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
        res.status(500).json({ error: "No se pudo obtener el usuario." });
    }
};

// ✅ Actualizar usuario por ID
exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar usuario con los nuevos datos
        await usuario.update(req.body);
        console.log("✅ Usuario actualizado:", usuario);
        res.json({ message: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error);
        res.status(500).json({ error: "No se pudo actualizar el usuario." });
    }
};

// ✅ Eliminar usuario por ID
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.destroy();
        console.log("🗑 Usuario eliminado:", usuario);
        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ error: "No se pudo eliminar el usuario." });
    }
};