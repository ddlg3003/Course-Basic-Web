const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                // Biến course thành Object để truy xuất (HandleBar không cho phép
                // truy xuất thuộc tính trực tiếp)
                courses = multipleMongooseToObject(courses);
                if (req.isAuthenticated()) {
                    console.log(req.user);
                    res.render('home', { courses, user: mongooseToObject(req.user) });
                }
                else 
                    res.render('home', { courses });
            })
            .catch(next);
    }
}

// Export value of this file
module.exports = new SiteController();
