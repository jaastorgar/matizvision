# 👁️ Matiz Vision - Plataforma Web para Óptica

Matiz Vision es una plataforma web desarrollada para la gestión integral de una óptica. Permite a los clientes comprar productos y agendar citas, a los trabajadores gestionar citas y a los administradores controlar usuarios, productos, y tener acceso total al sistema.

---

## ⚙️ Tecnologías Utilizadas

| Capa        | Tecnología            |
|-------------|------------------------|
| Frontend    | React.js + Vite        |
| Estilos     | CSS + Styled Components|
| Backend     | Node.js + Express      |
| Base de datos | PostgreSQL + Sequelize |
| Autenticación | JSON Web Tokens (JWT) |

---

## 📂 Estructura del Proyecto (Frontend)

```
matizvision/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GestionUsuarios.jsx
│   │   ├── GestionCitas.jsx
│   │   ├── GestionProductos.jsx
│   │   ├── AdminLogs.jsx
│   │   ├── UsuarioDetalle.jsx
│   │   └── PanelSettings.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
```

---

## 📖 Características Principales

### 👨‍💼 Roles y Permisos

| Acción                           | Cliente | Trabajador | Administrador |
|----------------------------------|---------|------------|----------------|
| Ver catálogo                     | ✅      | ✅         | ✅             |
| Comprar productos                | ✅      | ❌         | ✅             |
| Agendar / ver citas              | ✅      | ✅         | ✅             |
| Confirmar / gestionar citas      | ❌      | ✅         | ✅             |
| Gestionar usuarios               | ❌      | ❌         | ✅             |
| Gestionar productos              | ❌      | ❌         | ✅             |
| Ver dashboard / logs             | ❌      | ❌         | ✅             |

---

## 🛠️ Instalación y Ejecución

### ▶️ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/matizvision.git
cd matizvision
```

### 🔧 Instalar dependencias (frontend)
```bash
cd frontend
npm install
npm run dev
```

### 🔧 Instalar dependencias (backend)
```bash
cd backend
npm install
npm run dev
```

---

## 🔐 Autenticación y Seguridad
- Login protegido por JWT.
- Rutas privadas con `ProtectedRoute.jsx`.
- Control de accesos por rol.

---

## 📊 Próximas Mejoras
- Implementar historial de citas por usuario.
- Integrar pasarela de pagos.
- Mejorar responsividad para móviles.
- Integración con sistemas de notificaciones (email o WhatsApp).

---

## 📚 Licencia
Este proyecto es de uso exclusivo para Matiz Vision. Todos los derechos reservados.