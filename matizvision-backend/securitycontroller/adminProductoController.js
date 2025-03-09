const { Producto } = require("../models");

// 📌 Obtener todos los productos
exports.obtenerProductosAdmin = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// 📌 Crear un nuevo producto con imagen
exports.crearProductoAdmin = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null; // Guardar la ruta

    const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock, imagen });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("❌ Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// 📌 Actualizar un producto (incluye imagen opcional)
exports.actualizarProductoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await producto.update({ nombre, descripcion, precio, stock, imagen: imagen || producto.imagen });
    res.json({ message: "Producto actualizado correctamente", producto });
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// 📌 Eliminar un producto
exports.eliminarProductoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await producto.destroy();
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};