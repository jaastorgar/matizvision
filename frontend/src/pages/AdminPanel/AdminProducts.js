import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      setNewProduct({ name: "", description: "", price: "", stock: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingProduct.id}`,
        editingProduct
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Productos</h2>
      <div style={styles.formContainer}>
        <h3>{editingProduct ? "Editar Producto" : "Agregar Producto"}</h3>
        <form style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={editingProduct ? handleEditChange : handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={
              editingProduct ? editingProduct.description : newProduct.description
            }
            onChange={editingProduct ? handleEditChange : handleInputChange}
            style={styles.input}
          />
          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={editingProduct ? handleEditChange : handleInputChange}
            style={styles.input}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={editingProduct ? editingProduct.stock : newProduct.stock}
            onChange={editingProduct ? handleEditChange : handleInputChange}
            style={styles.input}
          />
          <button
            type="button"
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
            style={styles.button}
          >
            {editingProduct ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => setEditingProduct(product)}
                  style={styles.actionButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{ ...styles.actionButton, backgroundColor: "red" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  actionButton: {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AdminProducts;