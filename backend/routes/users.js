const express = require('express');
const upload = require('../Middlewares/Middleware');
const { getAllUsers, createUser, registerUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/register', upload.single('profile_picture'), registerUser);

module.exports = router;