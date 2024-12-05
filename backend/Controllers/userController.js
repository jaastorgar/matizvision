const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Subir foto del usuario
exports.uploadPhoto = async (req, res) => {
  try {
    const userId = req.params.id; // ID del usuario desde la URL
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica si ya tiene una foto y elimina la anterior si no es la predeterminada
    if (user.photo && user.photo !== '/uploads/users/default.jpg') {
      const oldPath = path.join(__dirname, '..', user.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Elimina la foto anterior
      }
    }

    // Asigna la nueva ruta al campo photo
    const photoPath = `/uploads/users/${req.file.filename}`;
    user.photo = photoPath;

    await user.save(); // Guarda los cambios en la base de datos
    res.status(200).json({ message: 'Foto actualizada con éxito', photo: photoPath });
  } catch (error) {
    console.error('Error al cargar la foto:', error);
    res.status(500).json({ message: 'Error al cargar la foto', error });
  }
};