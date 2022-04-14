const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                // res.send(req.params.slug);
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/done - Done create course
    done(req, res, next) {
        const formData = req.body;
        const course = new Course(formData);
        course.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(() => {

            });
    }
}
// Export value of this file
module.exports = new CourseController();