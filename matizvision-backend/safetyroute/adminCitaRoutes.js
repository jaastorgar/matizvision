const express = require("express");
const router = express.Router();
const {
  obtenerCitasAdmin,
  crearCitaAdmin,
  actualizarCitaAdmin,
  eliminarCitaAdmin,
} = require("../securitycontroller/adminCitaController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// 📌 Obtener todas las citas (Solo Admin)
router.get("/", verifyToken, isAdmin, obtenerCitasAdmin);

//  📌 Crear un producto nuevo (Solo Admin)
router.post("/", verifyToken, isAdmin, crearCitaAdmin);

// 📌 Actualizar estado de una cita (Solo Admin)
router.put("/:id", verifyToken, isAdmin, actualizarCitaAdmin);

// 📌 Eliminar una cita (Solo Admin)
router.delete("/:id", verifyToken, isAdmin, eliminarCitaAdmin);

module.exports = router;