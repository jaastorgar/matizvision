const express = require('express');
const router = express.Router();
const { getAllSettings, getSettingByKey, createSetting, updateSetting, deleteSetting } = require('../controllers/panelsettingsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas protegidas para configuraciones del panel
router.get('/', verifyToken, isAdmin, getAllSettings);             
router.get('/:key', verifyToken, isAdmin, getSettingByKey);        
router.post('/', verifyToken, isAdmin, createSetting);             
router.put('/:key', verifyToken, isAdmin, updateSetting);          
router.delete('/:key', verifyToken, isAdmin, deleteSetting);       

module.exports = router;