const express = require('express');
const router = express.Router();

router.get('/action', (req, res, next) => {
    if (!req.session.user) {
        let error = new Error('No user logged in');
        error.status = 404;
        next(error);
    } else {
        let user = req.session.user;

        
        
        user.totalActions ++;

        console.log(`User "${user.name}" performed an action. New total: ${user.totalActions}`);

        res.send(`New total ${user.totalActions}`);
    }
});

module.exports = router;