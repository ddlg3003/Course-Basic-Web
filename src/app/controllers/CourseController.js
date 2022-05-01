const Course = require('../models/Course');
const User = require('../models/User');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.send(req.params.slug);
                if (req.isAuthenticated()) {
                    res.render('courses/show', {
                        course: mongooseToObject(course),
                        user: mongooseToObject(req.user),
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
        res.render('courses/create', { user: mongooseToObject(req.user) });
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
                    user: mongooseToObject(req.user),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses/list'))
            .catch(next);
    }

    // [PUT] /courses/:name/add
    add(req, res, next) {
        User.updateOne(
            { _id: req.user._id },
            { $addToSet: { mycourses: req.params.name } },
        )
            .then(() => res.redirect('/me/my-courses'))
            .catch(next);
    }

    // [GET] /courses/list
    list(req, res, next) {
        Course.find()
            .then((courses) => {
                if (req.isAuthenticated())
                    res.render('courses/list', {
                        courses: multipleMongooseToObject(courses),
                        user: mongooseToObject(req.user),
                    });
                else
                    res.render('courses/list', {
                        courses: multipleMongooseToObject(courses),
                    });
            })
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/courses/list'))
            .catch(next);
    }
}
// Export value of this file
module.exports = new CourseController();
