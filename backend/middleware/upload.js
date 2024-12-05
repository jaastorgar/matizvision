const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Selección dinámica del destino según el tipo de entidad
    const folder = req.params.type === 'product' ? 'uploads/products' : 'uploads/users';
    cb(null, folder); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    const entityId = req.params.id; // Usamos el ID del usuario o producto
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${entityId}_${uniqueSuffix}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.test(ext)) {
      return cb(new Error('Solo se permiten archivos JPEG, JPG o PNG'));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de tamaño: 2MB
});

module.exports = upload;