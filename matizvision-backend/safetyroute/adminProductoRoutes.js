const express = require("express");
const router = express.Router();
const {
  obtenerProductosAdmin,
  crearProductoAdmin,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
} = require("../securitycontroller/adminProductoController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// 📌 Obtener todos los productos (Solo Admin)
router.get("/", verifyToken, isAdmin, obtenerProductosAdmin);

// 📌 Crear un nuevo producto (Solo Admin)
router.post("/", verifyToken, isAdmin, crearProductoAdmin);

// 📌 Actualizar un producto (Solo Admin)
router.put("/:id", verifyToken, isAdmin, actualizarProductoAdmin);

// 📌 Eliminar un producto (Solo Admin)
router.delete("/:id", verifyToken, isAdmin, eliminarProductoAdmin);

module.exports = router;