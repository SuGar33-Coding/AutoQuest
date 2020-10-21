import {Router} from 'express';
const router = Router();

router.get('/hi', (req, res, next) => {
    res.send('hello');
});

module.exports = router;