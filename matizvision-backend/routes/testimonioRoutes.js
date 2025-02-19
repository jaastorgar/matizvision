const express = require("express");
const router = express.Router();
const testimonioController = require("../controllers/testimonioController");

// ✅ Obtener testimonios
router.get("/", testimonioController.obtenerTestimonios);

// ✅ Agregar un testimonio
router.post("/", testimonioController.crearTestimonio);

// ✅ Eliminar un testimonio (restringido para admins)
router.delete("/:id", testimonioController.eliminarTestimonio);

module.exports = router;