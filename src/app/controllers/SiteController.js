const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    index(req, res, next) {
        // res.render('home');

        // controller gửi yêu cầu đến models để lấy dữ liệu
        // Course.find({}, function(err, courses) {
        //     if (!err){
        //         res.json(courses);
        //         return;
        //     }
        //     else
        //         next();
        // });
        Course.find({})
            .then((courses) => {
                // Biến course thành Object để truy xuất (HandleBar không cho phép
                // truy xuất thuộc tính trực tiếp)
                courses = multipleMongooseToObject(courses);
                res.render('home', { courses });
            })
            .catch(next);
    }
}

// Export value of this file
module.exports = new SiteController();
