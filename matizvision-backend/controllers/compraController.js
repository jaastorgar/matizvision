const { Compra, DetalleCompra, Producto, Usuario } = require('../models');

// Validador de carrito
const validarCarrito = (carrito) => {
  if (!Array.isArray(carrito) || carrito.length === 0) return false;
  return carrito.every((item) => {
    return (
      typeof item.productoId === "number" &&
      Number.isInteger(item.cantidad) &&
      item.cantidad > 0
    );
  });
};

exports.createCompra = async (req, res) => {
  try {
    const { usuarioId, carrito } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ msg: "El ID de usuario es obligatorio." });
    }

    if (!validarCarrito(carrito)) {
      return res.status(400).json({
        msg: "El carrito debe contener productos válidos con cantidad mayor a 0.",
      });
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    // Calcular total
    let total = 0;
    for (const item of carrito) {
      const producto = await Producto.findByPk(item.productoId);
      if (!producto) {
        return res.status(404).json({ msg: `Producto con ID ${item.productoId} no encontrado.` });
      }
      total += producto.precio * item.cantidad;
    }

    // Crear la compra
    const nuevaCompra = await Compra.create({
      usuarioId,
      total,
      estado: "pendiente",
    });

    // Guardar detalles de la compra
    for (const item of carrito) {
      await DetalleCompra.create({
        compraId: nuevaCompra.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
      });
    }

    res.status(201).json({ msg: "Compra registrada exitosamente", compra: nuevaCompra });

  } catch (error) {
    console.error("❌ Error al registrar la compra:", error);
    res.status(500).json({ msg: "Error al procesar la compra", error: error.message });
  }
};

exports.obtenerComprasPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const compras = await Compra.findAll({
      where: { usuarioId },
      include: [{ model: DetalleCompra, include: [Producto] }],
    });

    res.json(compras);
  } catch (error) {
    console.error("❌ Error al obtener compras:", error);
    res.status(500).json({ msg: "Error interno del servidor", error: error.message });
  }
};

exports.updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const compra = await Compra.findByPk(id);
    if (!compra) {
      return res.status(404).json({ msg: "Compra no encontrada" });
    }

    compra.estado = estado;
    await compra.save();

    res.json({ msg: "Estado de la compra actualizado correctamente", compra });
  } catch (error) {
    console.error("❌ Error al actualizar compra:", error);
    res.status(500).json({ msg: "Error interno al actualizar compra", error: error.message });
  }
};