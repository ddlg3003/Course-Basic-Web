const User = require('../models/User');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class UserController {
    // [GET] /users
    index(req, res, next) {
        User.find({})
            .then((users) => {
                // Get list of users
                users = multipleMongooseToObject(users);
                if (req.isAuthenticated()) {
                    res.render('users/show', {
                        users,
                        user: mongooseToObject(req.user),
                    });
                } else res.render('users/show', { users });
            })
            .catch(next);
    }
}

// Export value of this file
module.exports = new UserController();