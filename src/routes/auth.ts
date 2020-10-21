import {Router} from 'express';
const router = Router();
import { getGabe } from '../db';

/* Testing logging someone in */
router.get('/loginGabe', async (req, res, next) => {
    let user = await getGabe();

    if (user.error) {
        let error = new Error(user.error.message);
        // error.status = 404;
        next(error);
    } else {
        /* Set user in current session */
        req!.session!.user = user;
        res.send(user);
    }
    
});

module.exports = router;