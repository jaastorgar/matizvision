const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const crearAdmin = async () => {
    try {
        const email = 'javi@matizvision.cl';
        console.log(`🔹 Verificando si el usuario admin (${email}) ya existe...`);

        // Verificar si ya existe un admin con ese correo
        const existeAdmin = await Usuario.findOne({ where: { email } });

        if (existeAdmin) {
            console.log(`⚠️ El usuario admin con correo ${email} ya existe. No se realizará la inserción.`);
            return;
        }

        console.log('🛠️ Creando usuario administrador...');

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash('admin1234', 10);

        // Crear el usuario administrador
        await Usuario.create({
            nombre: 'Administrador',
            apellido_paterno: 'Sistema',
            apellido_materno: 'MatizVision',
            rut: '87654322', 
            dv: 'K',
            telefono: '987654322', 
            email: email,
            password: hashedPassword,
            rol: 'admin'
        });

        console.log(`✅ Usuario administrador creado con éxito con correo ${email}.`);
    } catch (error) {
        console.error('❌ Error al crear el usuario admin:', error);
    }
};

// Ejecutar el script
crearAdmin();