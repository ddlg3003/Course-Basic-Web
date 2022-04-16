const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/my-courses', meController.myCourses);

module.exports = router;
