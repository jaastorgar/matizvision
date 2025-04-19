const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

// Validadores personalizados
const validarEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validarPassword = (password) => password.length >= 8;
const validarRut = (rut) => /^[0-9]{7,9}$/.test(rut);
const validarDv = (dv) => /^[0-9kK]{1}$/.test(dv);
const validarTelefono = (tel) => /^[0-9]{8,12}$/.test(tel);

exports.register = async (req, res) => {
    try {
        const { nombre, apellido_paterno, apellido_materno, rut, dv, telefono, email, password } = req.body;

        // Validación de campos
        if (!nombre || !apellido_paterno || !apellido_materno || !rut || !dv || !telefono || !email || !password) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        if (!validarEmail(email)) {
            return res.status(400).json({ msg: "Formato de correo no válido" });
        }

        if (!validarPassword(password)) {
            return res.status(400).json({ msg: "La contraseña debe tener al menos 8 caracteres" });
        }

        if (!validarRut(rut)) {
            return res.status(400).json({ msg: "El RUT debe tener entre 7 y 9 dígitos sin puntos ni guión" });
        }

        if (!validarDv(dv)) {
            return res.status(400).json({ msg: "Dígito verificador inválido" });
        }

        if (!validarTelefono(telefono)) {
            return res.status(400).json({ msg: "El teléfono debe contener entre 8 y 12 dígitos numéricos" });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).json({ msg: "Ya existe un usuario con ese correo" });
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

        res.status(201).json({ msg: "Usuario registrado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Correo y contraseña son obligatorios" });
        }

        if (!validarEmail(email)) {
            return res.status(400).json({ msg: "Correo inválido" });
        }

        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

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
        const usuario = await Usuario.findByPk(req.user.id, {
            attributes: ["id", "nombre", "apellido_paterno", "apellido_materno", "rut", "dv", "telefono", "email", "rol"]
        });

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        console.error("❌ Error al obtener perfil:", error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};