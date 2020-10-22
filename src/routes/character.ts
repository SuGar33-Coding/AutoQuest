import {Router} from 'express';
import { HttpError } from "../types/index";

const router = Router();

router.get('/level', (req, res, next) => {
    if (req.session!.user) {
        res.status(200).send(`${req.session!.user.level}`);
    } else {
        let error = new HttpError(404, "No user logged in");
        next(error);
    }
});

router.get('/totalActions', (req, res, next) => {
    if (req.session!.user) {
        res.status(200).send(`${req.session!.user.totalActions}`);
    } else {
        let error = new Error('No user logged in');
        // error.status = 404;
        next(error);
    }
});

module.exports = router;