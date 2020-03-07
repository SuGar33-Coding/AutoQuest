const config = require('config');

const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const morgan = require('morgan');
const cors = require('cors');

/* Get Express app */
const app = express();

/* Logger */
app.use(morgan('dev'));

//TODO: Maybe implement bodyparser for sending json data through the API

/* Use sessions middleware */
app.use(session({
    name: 'SID',
    secret: `I'm wearing three pairs of underwear right now`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        secure: false // TODO: set to true for production
    }
}));

/* Default route */
app.get('/', (req, res) => {
    req.session.ctr ? req.session.ctr ++ : req.session.ctr = 1;
    
    res.send(`How did you get here? Shoo!
    How many times you have gone to this URL: ${req.session.ctr}`);
});

/* Set api routes */
app.use('/', routes);

/* Invalid request response */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

/* Error handler */
app.use((error, req, res, next) => {
    let status = error.status || 500;
    res.status(status);
    res.json({
        error: {
            message: error.message,
            status: status
        }
    })
});

/* Spin up server */
port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});