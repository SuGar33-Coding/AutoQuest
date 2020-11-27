import { Router } from "express";
import { authenticateWithToken } from "../middleware/jwt";
import { User } from "../models/User";
import { HttpError } from "../types/index";

const router = Router();

router.use(authenticateWithToken);

router.get("/level", async (req, res, next) => {
    res.status(200).send({
        level: req.user.level,
    });
});

router.get("/totalActions", (req, res, next) => {
    if (req.session!.user) {
        res.status(200).send(`${req.session!.user.totalActions}`);
    } else {
        const error = new Error("No user logged in");
        // error.status = 404;
        next(error);
    }
});

module.exports = router;
