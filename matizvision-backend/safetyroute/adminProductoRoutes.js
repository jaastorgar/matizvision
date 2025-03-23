const express = require("express");
const router = express.Router();
const {
  obtenerProductos,
  crearProducto,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
} = require("../securitycontroller/adminProductoController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// 📦 Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ruta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
  },
});

const upload = multer({ storage });

// 📌 Obtener todos los productos (Solo Admin)
router.get("/", verifyToken, isAdmin, obtenerProductos);

// 📌 Crear un nuevo producto con imagen (Solo Admin)
router.post("/", verifyToken, isAdmin, upload.single("imagen"), crearProducto);

// 📌 Actualizar un producto (Solo Admin)
router.put("/:id", verifyToken, isAdmin, upload.single("imagen"), actualizarProductoAdmin);

// 📌 Eliminar un producto (Solo Admin)
router.delete("/:id", verifyToken, isAdmin, eliminarProductoAdmin);

module.exports = router;