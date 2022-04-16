const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/my-courses
    myCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('me/myCourses', {courses: multipleMongooseToObject(courses)}))
            .catch(next);
    }
}
// Export value of this file
module.exports = new MeController();
