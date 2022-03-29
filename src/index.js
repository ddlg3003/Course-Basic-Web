// require handlebars {engine}
const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const db = require('./config/db');

// Connect sau khi import từ db/index.js
db.connect();

// require routes folder
const route = require('./routes');

// Read public dir
app.use(express.static(path.join(__dirname, 'public')));

// Use qs to parse the query string to object
// Use body-parser to parse form data
// Middleware saves "form" data
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Save js codes (fetch, XML,...)
app.use(express.json());

// Template engine
app.engine(
    'hbs',
    engine({
        // Rut gon duoi file
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

// Http logger
app.use(morgan('combined'));

//  Routes init --> routes/index.js --> home.js --> homeController.js
route(app);

// Listen the port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
