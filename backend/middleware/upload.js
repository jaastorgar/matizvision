const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users'); // Carpeta donde se guardarán las fotos
  },
  filename: (req, file, cb) => {
    const userId = req.params.id; // Usamos el ID del usuario para nombrar el archivo
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, `${userId}_${uniqueSuffix}`);
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