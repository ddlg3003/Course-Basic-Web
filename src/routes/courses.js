const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
const { isAdminLogin, isUserLogin } = require('../config/middleware/passport');
const courseController = require('../app/controllers/CourseController');

router.post('/:name/add', auth.checkAuthenticated, isUserLogin, courseController.add);
// Admin only
router.get(
    '/create',
    auth.checkAuthenticated,
    isAdminLogin,
    courseController.create,
);
router.post('/done', courseController.done);
// Admin only
router.get(
    '/:id/edit',
    auth.checkAuthenticated,
    isAdminLogin,
    courseController.edit,
);
// PUT
router.get(
    '/list',
    auth.checkAuthenticated,
    isAdminLogin,
    courseController.list,
);
router.post('/:id', auth.checkAuthenticated, courseController.update);
router.get('/:slug', courseController.show);

module.exports = router;
