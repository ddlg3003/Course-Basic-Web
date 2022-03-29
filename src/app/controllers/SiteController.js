class SiteController {
    // [GET] /home
    index(req, res) {
        res.render('home');
    }
}

// Export value of this file
module.exports = new SiteController();
