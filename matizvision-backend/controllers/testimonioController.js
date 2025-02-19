const { Testimonio, Usuario } = require("../models");

// ✅ Obtener todos los testimonios
exports.obtenerTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonio.findAll({
            include: [{ model: Usuario, attributes: ["nombre"] }],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(testimonios);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los testimonios", error });
    }
};

// ✅ Agregar un nuevo testimonio
exports.crearTestimonio = async (req, res) => {
    try {
        const { nombre, comentario } = req.body;
        const usuarioId = req.user ? req.user.id : null; // Obtener usuarioId si está autenticado

        // Validar que el comentario no esté vacío
        if (!comentario || comentario.trim() === "") {
            return res.status(400).json({ msg: "El comentario es obligatorio" });
        }

        // Si el usuario está autenticado, el nombre no es obligatorio
        if (!usuarioId && (!nombre || nombre.trim() === "")) {
            return res.status(400).json({ msg: "Debe proporcionar un nombre si no está autenticado" });
        }

        // Crear testimonio
        const nuevoTestimonio = await Testimonio.create({
            usuarioId: usuarioId || null, // Si está autenticado, guarda su ID
            nombre: usuarioId ? null : nombre, // Si no está autenticado, usa el nombre ingresado
            comentario,
        });

        res.status(201).json({ msg: "Testimonio guardado con éxito", testimonio: nuevoTestimonio });
    } catch (error) {
        console.error("❌ Error al guardar testimonio:", error);
        res.status(500).json({ msg: "Error interno al guardar testimonio" });
    }
};

// ✅ Eliminar un testimonio (Solo admin)
exports.eliminarTestimonio = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonio = await Testimonio.findByPk(id);

        if (!testimonio) {
            return res.status(404).json({ msg: "Testimonio no encontrado" });
        }

        await testimonio.destroy();
        res.status(200).json({ msg: "Testimonio eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el testimonio", error });
    }
};