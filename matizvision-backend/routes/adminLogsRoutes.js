const express = require('express');
const router = express.Router();
const { getAdminLogs, createAdminLog, getAdminLogById, deleteAdminLog } = require('../controllers/adminLogsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas protegidas para manejar logs administrativos
router.get('/', verifyToken, isAdmin, getAdminLogs);         
router.post('/', verifyToken, isAdmin, createAdminLog);      
router.get('/:id', verifyToken, isAdmin, getAdminLogById);   
router.delete('/:id', verifyToken, isAdmin, deleteAdminLog);

module.exports = router;