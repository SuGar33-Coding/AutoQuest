import { Router } from "express";
import { HttpError } from "../types/index";
const router = Router();
import { getGabe } from "../db";
import { User, UserType } from "../models/User";

/* Testing logging someone in */
router.get("/loginGabe", async (req, res, next) => {
    const user = await getGabe();

    if (user.error) {
        const error = new HttpError(404);
        next(error);
    } else {
        /* Set user in current session */
        req.session!.user = user;
        res.send(user);
    }
});

/**
 * Sign up a new user and create an entry for them on the database
 */
router.post("/signup", async (req, res, next) => {
    const data: UserType = {
        userName: req.query.pogName as string,
    };

    const newUser = await User.create(data);
    res.status(200).send(newUser);
});

module.exports = router;
