const express = require('express');
const router = express.Router();
const adminLogsController = require('../controllers/adminLogsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, adminLogsController.getAllLogs);
router.post('/', authMiddleware, adminLogsController.createLog);

module.exports = router;