import { Router } from "express";
import { HttpError } from "../types/index";

const router = Router();

import moment from "moment";
const logFormat = "MMM D, YYYY HH:mm:ss";

router.post("/action", (req, res, next) => {
    if (!req.session!.user) {
        throw new HttpError(404, "No user logged in");
        // next(error);
    } else {
        const user = req.session!.user;

        // if the last action time hasn't been logged, set it so that the user can perform an action
        // TODO: potential exploit where the user repeatedly clears cookies faster than the progress timer
        if (!user.lastActionTime) {
            user.lastActionTime = moment().subtract(user.actionTime + 1, "s");
        }

        if (moment().diff(user.lastActionTime, "second") < user.actionTime) {
            console.log(
                `${moment().format(logFormat)}: User "${
                    user.name
                }" is performing actions too fast... might be cheating :O`
            );
            const error = new Error("Too many action requests");
            // error.status = 429;
            next(error);
        } else {
            user.totalActions++;
            console.log(
                `${moment().format(logFormat)}: User "${
                    user.name
                }" performed an action. New total: ${user.totalActions}`
            );
            user.lastActionTime = moment();
            res.send(`New total ${user.totalActions}`);
        }
    }
});

module.exports = router;
