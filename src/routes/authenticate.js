const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const User = require('../app/models/User');
const auth = require('../config/middleware/auth');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

// Middleware
passport.use(
    new LocalStrategy(function (username, password, done) {
        User.findOne({ username: username }, async function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Username không tồn tại!',
                });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return done(null, false, { message: 'Sai mật khẩu!' });
            }
            return done(null, user);
        });
    }),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

const authController = require('../app/controllers/AuthController');

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
