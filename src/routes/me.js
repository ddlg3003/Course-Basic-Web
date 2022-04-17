const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');

const meController = require('../app/controllers/MeController');

router.get('/my-courses', auth.checkAuthenticated, meController.myCourses);

module.exports = router;
