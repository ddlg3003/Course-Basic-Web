const Course = require('../models/Course');

class SiteController {
    // [GET] /home
    index(req, res) {
        // res.render('home');
        Course.find({}, function(err, courses) {
            if (!err){
                res.json(courses);
                return;
            }
            else
            res.status(400).json({error: 'ERROR!!'});
        });
    }
}

// Export value of this file
module.exports = new SiteController();
