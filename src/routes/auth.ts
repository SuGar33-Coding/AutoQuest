import { Router } from "express";
const router = Router();
import { User, UserType } from "../models/User";
// import { HttpError } from "../types/index";
// import { getGabe } from "../db";

/* Testing logging someone in */
// router.get("/loginGabe", async (req, res, next) => {
//     const user = await getGabe();

//     if (user.error) {
//         const error = new HttpError(404);
//         next(error);
//     } else {
//         /* Set user in current session */
//         req.session!.user = user;
//         res.send(user);
//     }
// });

/**
 * Sign up a new user and create an entry for them on the database
 */
router.post("/signup", async (req, res, next) => {
    const data: UserType = {
        userName: req.query.userName as string,
        level: 10,
        numActions: 100,
    };

    try {
        const newUser = await User.create(data);
        res.status(200).send(newUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
