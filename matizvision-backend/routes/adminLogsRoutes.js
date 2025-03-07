const express = require('express');
const router = express.Router();
const { getAdminLogs, createAdminLog, getAdminLogById, deleteAdminLog } = require('../controllers/adminLogsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Corrección en la ruta del middleware

// Verificar que el token sea válido antes de verificar si es admin
router.use(verifyToken);
router.use(isAdmin);

// Rutas protegidas para manejar logs administrativos
router.get('/', getAdminLogs);
router.post('/', createAdminLog);
router.get('/:id', getAdminLogById);
router.delete('/:id', deleteAdminLog);

module.exports = router;