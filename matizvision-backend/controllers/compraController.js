const { Compra, Usuario, Producto, DetalleCompra } = require('../models');

exports.getAllCompras = async (req, res) => {
    try {
        const compras = await Compra.findAll({ include: [Usuario, Producto] });
        res.json(compras);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener compras", error });
    }
};

exports.createCompra = async (req, res) => {
    try {
        const { usuarioId, productos } = req.body;

        let total = 0;
        for (const prod of productos) {
            const producto = await Producto.findByPk(prod.productoId);
            total += producto.precio * prod.cantidad;
        }

        const compra = await Compra.create({ usuarioId, total, estado: 'pendiente' });

        for (const prod of productos) {
            await DetalleCompra.create({
                compraId: compra.id,
                productoId: prod.productoId,
                cantidad: prod.cantidad
            });
        }

        res.status(201).json({ msg: "Compra realizada con éxito", compra });
    } catch (error) {
        res.status(500).json({ msg: "Error al realizar la compra", error });
    }
};

exports.updateCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        await Compra.update({ estado }, { where: { id } });
        res.json({ msg: "Compra actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar compra", error });
    }
};

exports.obtenerComprasPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        if (!usuarioId || isNaN(usuarioId)) {
            return res.status(400).json({ msg: "ID de usuario no válido" });
        }

        const compras = await Compra.findAll({
            where: { usuarioId },
            include: [
                {
                    model: DetalleCompra,
                    as: "detalles",
                    include: [{ model: Producto, attributes: ["nombre", "precio"] }]
                }
            ]
        });

        if (!compras || compras.length === 0) {
            return res.status(404).json({ msg: "No hay compras registradas para este usuario." });
        }

        res.json(compras);
    } catch (error) {
        console.error("❌ Error al obtener compras:", error);
        res.status(500).json({ msg: "Error interno al obtener compras" });
    }
};