// Middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

function initializePassportLogin(passport) {
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
}

function checkRegisterUsername(req, res, next) {
    User.findOne({ username: req.body.username }, async function (err, user) {
        if (err) {
            // Do sth
        }
        if (!user) {
            next();
        } else {
            await req.flash('error', 'Username đã tồn tại!');
            res.redirect('/auth/register');
        }
    });
}

function checkRegisterEmail(req, res, next) {
    User.findOne({ email: req.body.email }, async function (err, user) {
        if (err) {
            // Do sth
        }
        if (!user) {
            next();
        } else {
            await req.flash('error', 'Email đã tồn tại!');
            res.redirect('/auth/register');
        }
    });
}

async function checkPassword(req, res, next) {
    if (req.body.password !== req.body.rePassword) {
        await req.flash('error', 'Mật khẩu nhập lại không khớp!');
        res.redirect('/auth/register');
    } else next();
}

function isAdminLogin(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) 
            res.redirect('/auth/login');
        else if (user.role === 'admin') {
            next();
        }   
        else if (user.role === 'user') {
            res.redirect('/');
        }
    });
}

function isUserLogin(req, res, next) {
    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) 
            res.redirect('/auth/login');
        else if (user.role === 'admin') {
            res.redirect('/');
        }   
        else if (user.role === 'user') {
            next();
        }
    });
}

module.exports = {
    initializePassportLogin,
    checkRegisterUsername,
    checkRegisterEmail,
    checkPassword,
    isAdminLogin,
    isUserLogin,
};
