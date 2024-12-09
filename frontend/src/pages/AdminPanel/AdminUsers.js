import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    rut: "",
    dv: "",
    age: "",
    birthDate: "",
    photo: "",
    role: "cliente",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", newUser);
      setUsers([...users, response.data]);
      setNewUser({
        name: "",
        lastName: "",
        email: "",
        rut: "",
        dv: "",
        age: "",
        birthDate: "",
        photo: "",
        role: "cliente",
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, editingUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Gestión de Usuarios</h1>
      <div style={styles.formContainer}>
        <h3 style={styles.sectionHeader}>Agregar Usuario</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
          style={styles.form}
        >
          {Object.keys(newUser).map((field) =>
            field !== "role" ? (
              <input
                key={`new-user-${field}`}
                type={field === "email" ? "email" : field === "birthDate" ? "date" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newUser[field]}
                onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                style={styles.input}
              />
            ) : null
          )}
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            style={styles.select}
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit" style={styles.addButton}>
            Agregar
          </button>
        </form>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            {Object.keys(newUser).map((field) => (
              <th key={`header-${field}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={`user-row-${user.id}`} style={styles.tableRow}>
              {Object.keys(newUser).map((field) => (
                <td key={`user-${user.id}-${field}`}>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser[field]}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, [field]: e.target.value })
                      }
                      style={styles.editInput}
                    />
                  ) : (
                    user[field]
                  )}
                </td>
              ))}
              <td style={styles.actions}>
                {editingUser && editingUser.id === user.id ? (
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    style={styles.saveButton}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingUser(user)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  style={styles.deleteButton}
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
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { textAlign: "center", color: "#333" },
  formContainer: { marginBottom: "30px" },
  sectionHeader: { marginBottom: "10px" },
  form: { display: "flex", flexWrap: "wrap", gap: "10px" },
  input: { padding: "10px", borderRadius: "5px", flex: "1 1 calc(33% - 20px)" },
  select: { padding: "10px", borderRadius: "5px" },
  addButton: { backgroundColor: "#28a745", color: "#fff" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableRow: { backgroundColor: "#f9f9f9" },
  editInput: { padding: "10px", borderRadius: "5px" },
  editButton: { backgroundColor: "#007bff", color: "#fff" },
  saveButton: { backgroundColor: "#ffc107", color: "#fff" },
  deleteButton: { backgroundColor: "#dc3545", color: "#fff" },
};

export default AdminUsers;