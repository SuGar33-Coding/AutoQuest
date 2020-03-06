const express = require('express');
const router = express.Router();
const { fun } = require('../controllers');

router.get('/hi', fun.hi);

module.exports = router;