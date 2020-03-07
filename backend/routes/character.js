const express = require('express');
const router = express.Router();

router.get('/level', (req, res, next) => {
    if (req.session.level) {
        res.status(200).send(`${req.session.level}`);
    } else {
        res.send('char has no level!');
    }
});

module.exports = router;