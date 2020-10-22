import { Router } from 'express';
const router = Router();

/* Add all routes to this object */
let routes: { [key: string]: NodeRequire } = {
    auth: require('./auth'),
    fun: require('./fun'),
    character: require('./character'),
    game: require('./game')
};

/* Adds the routes to the api named by their key */
Object.keys(routes).forEach(key => {
    router.use(`/${key}`, routes[key]);
});

export = router;