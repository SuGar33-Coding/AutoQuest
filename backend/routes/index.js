const express = require('express');
const router = express.Router();

/* Add all routes to this object */
routes = {
    auth: require('./auth'),
    fun: require('./fun'),
    character: require('./character'),
    game: require('./game')
};

/* Adds the routes to the api named by their key */
Object.keys(routes).forEach(key => {
    router.use(`/${key}`, routes[key]);
});

module.exports = router;