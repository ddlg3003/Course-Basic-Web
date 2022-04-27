// require routes/home
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');
const authRouter = require('./authenticate');
const userRouter = require('./user');

function route(app) {
    app.use('/users', userRouter);
    app.use('/me', meRouter);
    app.use('/auth', authRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
