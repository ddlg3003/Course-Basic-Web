const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');

class AuthController {
    // [GET] auth/login
    login(req, res, next) {
        res.render('auth/login', { layout: false });
    }

    // [GET] auth/register
    register(req, res, next) {
        res.render('auth/register', { layout: false });
    }

    // [POST] auth/register
    async doneRegister(req, res) {
        try {
            const formData = req.body;
            formData.password = await bcrypt.hash(req.body.password, 10);
            const user = new User(formData);
            console.log(user);
            user.save()
                .then(() => {
                    res.redirect('/auth/login');
                })
                .catch(() => {});
        } catch {
            res.redirect('auth/register');
        }
    }

    doneLogin(req, res) {
        res.redirect('/');
    }

    logout(req, res) {
        req.logOut();
        res.redirect('/');
    }
}
// Export value of this file
module.exports = new AuthController();
