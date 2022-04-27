const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const { isUserLogin } = require('../config/middleware/passport');

const meController = require('../app/controllers/MeController');

router.get(
    '/my-courses',
    auth.checkAuthenticated,
    isUserLogin,
    meController.myCourses,
);

module.exports = router;
