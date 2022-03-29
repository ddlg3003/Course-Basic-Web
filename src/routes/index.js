// require routes/home
const siteRouter = require('./site');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    // use chay ham siteRouter
    app.use('/', siteRouter);
}

module.exports = route;
