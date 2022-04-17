const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                // Biến course thành Object để truy xuất (HandleBar không cho phép
                // truy xuất thuộc tính trực tiếp)
                courses = multipleMongooseToObject(courses);
                if (req.isAuthenticated())
                    res.render('home', { courses, name: req.user.username });
                else
                    res.render('home', { courses });
            })
            .catch(next);
    }
}

// Export value of this file
module.exports = new SiteController();
