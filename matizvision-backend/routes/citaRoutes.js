const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, citaController.getAllCitas);
router.post('/', authMiddleware, citaController.createCita);
router.put('/:id', authMiddleware, citaController.updateCita);
router.delete('/:id', authMiddleware, citaController.deleteCita);

module.exports = router;