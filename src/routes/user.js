const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const { isAdminLogin } = require('../config/middleware/passport');
const userController = require('../app/controllers/UserController');

router.get('/', auth.checkAuthenticated, isAdminLogin, userController.index);

module.exports = router;
