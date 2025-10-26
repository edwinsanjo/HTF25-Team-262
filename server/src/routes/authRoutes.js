const express = require('express');
const { login, me } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', auth(false), me);

module.exports = router;
