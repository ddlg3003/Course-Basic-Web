// require routes/home
const siteRouter = require('./site');

function route(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // });

    // get chay ham siteRouter
    app.get('/', siteRouter);
}

module.exports = route;
