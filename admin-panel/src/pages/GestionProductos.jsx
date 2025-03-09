import React, { useState, useEffect } from "react";
import api from "../api/api";

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 5;
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productoActual, setProductoActual] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await api.get("/productos");
            setProductos(response.data);
        } catch (error) {
            console.error("❌ Error al obtener productos:", error);
        }
    };

    const handleBuscar = (e) => {
        setBusqueda(e.target.value);
    };

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indiceUltimo = paginaActual * productosPorPagina;
    const indicePrimero = indiceUltimo - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);

    const cambiarPagina = (numero) => setPaginaActual(numero);

    const abrirModal = (producto = null) => {
        setProductoActual(producto);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setProductoActual(null);
        setModalAbierto(false);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("⚠️ ¿Seguro que deseas eliminar este producto?")) {
            try {
                await api.delete(`/productos/${id}`);
                fetchProductos();
                setMensaje("✅ Producto eliminado correctamente.");
            } catch (error) {
                console.error("❌ Error al eliminar producto:", error);
                setMensaje("❌ Error al eliminar el producto.");
            }
        }
    };

    return (
        <div className="container mx-auto p-8 w-full min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">📦 Gestión de Productos</h2>

            {mensaje && (
                <div className="text-center bg-green-500 text-white p-2 rounded-lg mb-4 w-3/4">
                    {mensaje}
                </div>
            )}

            <div className="flex justify-between items-center mb-6 w-3/4">
                <input
                    type="text"
                    placeholder="🔍 Buscar producto..."
                    className="p-3 border rounded-lg w-2/3 text-black"
                    value={busqueda}
                    onChange={handleBuscar}
                />
                <button onClick={() => abrirModal()} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg">
                    ➕ Agregar Producto
                </button>
            </div>

            <div className="overflow-auto bg-gray-800 shadow-lg rounded-lg p-6 w-3/4">
                <table className="w-full bg-gray-700 text-white rounded-lg">
                    <thead className="bg-gray-600 text-white sticky top-0">
                        <tr>
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Nombre</th>
                            <th className="py-4 px-6">Descripción</th>
                            <th className="py-4 px-6">Precio</th>
                            <th className="py-4 px-6">Stock</th>
                            <th className="py-4 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosActuales.map((producto) => (
                            <tr key={producto.id} className="border-b hover:bg-gray-600 text-center">
                                <td className="py-4 px-6">{producto.id}</td>
                                <td className="py-4 px-6">{producto.nombre}</td>
                                <td className="py-4 px-6">{producto.descripcion}</td>
                                <td className="py-4 px-6">${producto.precio}</td>
                                <td className="py-4 px-6">{producto.stock}</td>
                                <td className="py-4 px-6 flex justify-center space-x-2">
                                    <button onClick={() => abrirModal(producto)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                                        ✏️ Editar
                                    </button>
                                    <button onClick={() => handleEliminar(producto.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6">
                {Array.from({ length: Math.ceil(productosFiltrados.length / productosPorPagina) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => cambiarPagina(i + 1)}
                        className={`px-5 py-3 mx-2 text-lg font-bold ${paginaActual === i + 1 ? "bg-gray-700 text-white" : "bg-gray-500 text-gray-200"} rounded-lg shadow-lg`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {modalAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-1/3 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4 text-white">{productoActual ? "Editar Producto" : "Agregar Producto"}</h2>
                        <input type="text" placeholder="Nombre" className="w-full p-3 mb-3 border rounded-lg text-black" />
                        <input type="text" placeholder="Descripción" className="w-full p-3 mb-3 border rounded-lg text-black" />
                        <input type="number" placeholder="Precio" className="w-full p-3 mb-3 border rounded-lg text-black" />
                        <input type="number" placeholder="Stock" className="w-full p-3 mb-3 border rounded-lg text-black" />
                        <input type="file" className="w-full p-3 mb-3 border rounded-lg" accept="image/*" />
                        <div className="flex justify-end">
                            <button onClick={cerrarModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mr-2">Cancelar</button>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Guardar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GestionProductos;