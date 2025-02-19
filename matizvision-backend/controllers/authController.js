const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.register = async (req, res) => {
    try {
        console.log("📩 Datos recibidos en el backend:", req.body);

        const { nombre, apellido, telefono, email, password, rol } = req.body;

        if (!email || !password || !nombre || !apellido || !telefono) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Verificar si el usuario ya existe
        let userExists = await Usuario.findOne({ where: { email } });
        if (userExists) {
            console.log("⚠️ El usuario ya existe en la base de datos");
            return res.status(400).json({ msg: "El usuario ya está registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario en la base de datos
        const user = await Usuario.create({
            nombre,
            apellido,
            telefono,
            email,
            password: hashedPassword,
            rol: rol || 'cliente'
        });

        console.log("✅ Usuario registrado correctamente:", user);
        res.status(201).json({ msg: "Usuario registrado con éxito", usuario: user });
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        res.status(500).json({ msg: "Error al registrar usuario", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await Usuario.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

        // Generar token
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar usuario junto con el token
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
        res.status(500).json({ msg: "Error al iniciar sesión", error });
    }
};