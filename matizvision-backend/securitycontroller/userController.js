const Usuario = require('../models/usuario');

// ✅ Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        console.log("📡 Solicitando lista de usuarios...");
        const usuarios = await Usuario.findAll();
        console.log("✅ Usuarios obtenidos:", usuarios.length, "usuarios");
        res.json(usuarios);
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        res.status(500).json({ error: "No se pudieron obtener los usuarios." });
    }
};

// ✅ Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        console.log(`📡 Buscando usuario con ID: ${req.params.id}`);
        const usuario = await Usuario.findByPk(req.params.id);
        
        if (!usuario) {
            console.warn("⚠️ Usuario no encontrado:", req.params.id);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log("✅ Usuario encontrado:", usuario);
        res.json(usuario);
    } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
        res.status(500).json({ error: "No se pudo obtener el usuario." });
    }
};

// ✅ Actualizar usuario por ID
exports.updateUsuario = async (req, res) => {
    try {
        console.log(`📡 Solicitando actualización para usuario ID: ${req.params.id}`);
        console.log("🔄 Datos recibidos para actualización:", req.body);

        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            console.warn("⚠️ No se encontró el usuario para actualizar:", req.params.id);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar usuario con los nuevos datos
        await usuario.update(req.body);
        console.log("✅ Usuario actualizado correctamente:", usuario);
        res.json({ message: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        console.error("❌ Error al actualizar usuario:", error);
        res.status(500).json({ error: "No se pudo actualizar el usuario." });
    }
};

// ✅ Eliminar usuario por ID
exports.deleteUsuario = async (req, res) => {
    try {
        console.log(`📡 Solicitando eliminación del usuario ID: ${req.params.id}`);

        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            console.warn("⚠️ No se encontró el usuario para eliminar:", req.params.id);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.destroy();
        console.log("🗑 Usuario eliminado correctamente:", usuario);
        res.json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("❌ Error al eliminar usuario:", error);
        res.status(500).json({ error: "No se pudo eliminar el usuario." });
    }
};