const { Producto } = require('../models');

// Validadores manuales
const validarProducto = ({ nombre, precio, stock, descripcion }) => {
  if (!nombre || typeof nombre !== "string") return "El nombre es obligatorio.";
  if (typeof precio !== "number" || precio <= 0) return "El precio debe ser mayor a 0.";
  if (!Number.isInteger(stock) || stock < 0) return "El stock debe ser un número entero mayor o igual a 0.";
  if (descripcion && descripcion.length > 500) return "La descripción es demasiado larga.";
  return null;
};

exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion } = req.body;
    const imagen = req.file?.filename || null;

    // Parsear números si vienen como strings
    const parsedPrecio = parseFloat(precio);
    const parsedStock = parseInt(stock);

    const error = validarProducto({ nombre, precio: parsedPrecio, stock: parsedStock, descripcion });
    if (error) return res.status(400).json({ msg: `❌ ${error}` });

    const productoExistente = await Producto.findOne({ where: { nombre } });
    if (productoExistente) {
      return res.status(409).json({ msg: "Ya existe un producto con ese nombre." });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      precio: parsedPrecio,
      stock: parsedStock,
      descripcion,
      imagen
    });

    res.status(201).json({ msg: "✅ Producto creado con éxito", producto: nuevoProducto });

  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, precio, stock, descripcion } = req.body;
    const imagen = req.file?.filename || null;

    const parsedPrecio = parseFloat(precio);
    const parsedStock = parseInt(stock);

    const error = validarProducto({ nombre, precio: parsedPrecio, stock: parsedStock, descripcion });
    if (error) return res.status(400).json({ msg: `❌ ${error}` });

    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    producto.nombre = nombre;
    producto.precio = parsedPrecio;
    producto.stock = parsedStock;
    producto.descripcion = descripcion;
    if (imagen) producto.imagen = imagen;

    await producto.save();

    res.json({ msg: "✅ Producto actualizado correctamente", producto });

  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    await producto.destroy();
    res.json({ msg: "✅ Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
  }
};