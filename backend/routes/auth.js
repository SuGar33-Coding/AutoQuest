const express = require('express');
const router = express.Router();

const { getGabe } = require('../db');

router.get('/loginGabe', async (req, res, next) => {
    let user = await getGabe();
    req.session.user = user.user;
    req.session.level = user.level;
    res.send(user);
});

module.exports = router;