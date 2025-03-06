const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res) => {
    try {
        console.log("📩 Datos recibidos en el backend:", req.body);

        const { nombre, apellido_paterno, apellido_materno, rut, dv, telefono, email, password } = req.body;

        if (!nombre || !apellido_paterno || !apellido_materno || !rut || !dv || !telefono || !email || !password) {
            console.warn("⚠️ Todos los campos son obligatorios");
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            rut,
            dv,
            telefono,
            email,
            password: hashedPassword,
        });

        console.log("✅ Usuario registrado con éxito:", nuevoUsuario.email);
        res.status(201).json({ msg: "Usuario registrado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("📩 Intento de inicio de sesión:", req.body.email);

        const { email, password } = req.body;

        if (!email || !password) {
            console.warn("⚠️ Faltan credenciales");
            return res.status(400).json({ msg: "Correo y contraseña son obligatorios" });
        }

        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            console.warn("⚠️ Usuario no encontrado:", email);
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        console.log("🔑 Comparando contraseñas...");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn("⚠️ Contraseña incorrecta para el usuario:", email);
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        console.log("🔑 Generando token de autenticación...");
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '10h' });

        console.log("✅ Inicio de sesión exitoso para:", email);
        res.json({
            msg: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });

    } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);
        res.status(500).json({ msg: "Error al iniciar sesión", error });
    }
};

exports.getProfile = async (req, res) => {
    try {
        console.log("🔍 Buscando perfil de usuario con ID:", req.user.id);

        const usuario = await Usuario.findByPk(req.user.id, {
            attributes: ["id", "nombre", "apellido_paterno", "apellido_materno", "rut", "dv", "telefono", "email", "rol"]
        });

        if (!usuario) {
            console.warn("⚠️ Usuario no encontrado en la base de datos");
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        console.log("✅ Perfil obtenido correctamente y enviado al frontend:", usuario.toJSON());
        res.status(200).json(usuario); // 🔹 Asegurar que la respuesta se envía correctamente.
    } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};