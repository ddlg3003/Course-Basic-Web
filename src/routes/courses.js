const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const courseController = require('../app/controllers/CourseController');

router.get('/create', auth.checkAuthenticated, courseController.create);
router.post('/done', courseController.done);
router.get('/:id/edit', auth.checkAuthenticated, courseController.edit);
// PUT
router.post('/:id', auth.checkAuthenticated, courseController.update);
router.get('/:slug', courseController.show);

module.exports = router;
