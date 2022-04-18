// Middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app/models/User');
const bcrypt = require('bcrypt');

function initializePassport(passport) {    
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
    })
}

module.exports = { initializePassport };