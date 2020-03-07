const express = require('express');
const router = express.Router();

router.get('/level', (req, res, next) => {
    if (req.session.user) {
        res.status(200).send(`${req.session.user.level}`);
    } else {
        let error = new Error('No user logged in');
        error.status = 404;
        next(error);
    }
});

router.get('/totalActions', (req, res, next) => {
    if (req.session.user) {
        res.status(200).send(`${req.session.user.totalActions}`);
    } else {
        let error = new Error('No user logged in');
        error.status = 404;
        next(error);
    }
});

module.exports = router;