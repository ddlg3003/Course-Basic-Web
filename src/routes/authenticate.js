const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const auth = require('../config/middleware/auth');
const { initializePassport } = require('../config/middleware/passport');
const authController = require('../app/controllers/AuthController');
const passport = require('passport');

initializePassport(passport);

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
        failureFlash: true,
    }),
    authController.doneLogin,
);
router.post('/register', authController.doneRegister);
router.get('/login', auth.checkNotAuthenticated, authController.login);
router.post('/logout', authController.logout);
router.get('/register', auth.checkNotAuthenticated, authController.register);

module.exports = router;
