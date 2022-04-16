const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/done', courseController.done);
router.get('/:id/edit', courseController.edit);
// PUT
router.post('/:id', courseController.update);
router.get('/:slug', courseController.show);

module.exports = router;
