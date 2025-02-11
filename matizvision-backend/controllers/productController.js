const Producto = require('../models/producto');

exports.getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los productos" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

        res.json(producto);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el producto" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        if (!nombre || !descripcion || !precio || !stock) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        const producto = await Producto.create({ nombre, descripcion, precio, stock, imagen });
        res.status(201).json({ msg: "Producto creado con éxito", producto });
    } catch (error) {
        res.status(500).json({ msg: "Error al crear el producto" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, imagen } = req.body;

        const producto = await Producto.findByPk(id);
        if (!producto) return res.status(404).json({ msg: "Producto no encontrado" });

        await producto.update({ nombre, descripcion, precio, stock, imagen });
        res.json({ msg: "Producto actualizado con éxito", producto });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el producto" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ msg: "Producto no encontrado" });
        }

        await producto.destroy();
        res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el producto" });
    }
};