const Course = require('../models/Course');
const User = require('../models/User');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class MeController {
    // [GET] /me/my-courses
    myCourses(req, res, next) {
        Course.find({ name: req.user.mycourses })
            .then((courses) =>
                res.render('me/myCourses', {
                    courses: multipleMongooseToObject(courses),
                    user: mongooseToObject(req.user),
                }),
            )
            .catch(next);
    }
}
// Export value of this file
module.exports = new MeController();
