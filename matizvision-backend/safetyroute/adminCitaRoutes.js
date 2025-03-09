const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const {
  obtenerProductosAdmin,
  crearProductoAdmin,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
} = require("../securitycontroller/adminProductoController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// 📌 Obtener todos los productos
router.get("/", verifyToken, isAdmin, obtenerProductosAdmin);

// 📌 Crear un nuevo producto con imagen
router.post("/", verifyToken, isAdmin, upload.single("imagen"), crearProductoAdmin);

// 📌 Actualizar un producto con imagen opcional
router.put("/:id", verifyToken, isAdmin, upload.single("imagen"), actualizarProductoAdmin);

// 📌 Eliminar un producto
router.delete("/:id", verifyToken, isAdmin, eliminarProductoAdmin);

module.exports = router;