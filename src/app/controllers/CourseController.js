const Course = require('../models/Course');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.send(req.params.slug);
                if (req.isAuthenticated()) {
                    res.render('courses/show', {
                        course: mongooseToObject(course),
                        name: req.user.username,
                    });
                } else
                    res.render('courses/show', {
                        course: mongooseToObject(course),
                    });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create', { name: req.user.username });
    }

    //[POST] /courses/done - Done create course
    done(req, res, next) {
        const formData = req.body;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch(() => {});
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                    name: req.user.username,
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/my-courses'))
            .catch(next);
    }

    // [PUT] /courses/add
    add(req, res, next) {
        console.log(req.params.name);
        User.findOneAndUpdate(
                { _id: req.user._id },
                { $addToSet: { mycourses: req.params.name } }
            )
            .then(() => res.redirect('/me/my-courses'))
            .catch(next);
        
    }
}
// Export value of this file
module.exports = new CourseController();
