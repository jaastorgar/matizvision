const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Subir foto del producto
exports.uploadPhoto = async (req, res) => {
  try {
    const productId = req.params.id; // ID del producto desde la URL
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verifica si ya tiene una foto y elimina la anterior si no es la predeterminada
    if (product.photo && product.photo !== '/uploads/products/default.jpg') {
      const oldPath = path.join(__dirname, '..', product.photo);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // Elimina la foto anterior
      }
    }

    // Asigna la nueva ruta al campo photo
    const photoPath = `/uploads/products/${req.file.filename}`;
    product.photo = photoPath;

    await product.save(); // Guarda los cambios en la base de datos
    res.status(200).json({ message: 'Foto de producto actualizada con éxito', photo: photoPath });
  } catch (error) {
    console.error('Error al cargar la foto del producto:', error);
    res.status(500).json({ message: 'Error al cargar la foto del producto', error });
  }
};