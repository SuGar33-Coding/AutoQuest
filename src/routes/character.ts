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

router.get("/num-actions", (req, res, next) => {
    res.status(200).send({
        numActions: req.user.numActions,
    });
});

module.exports = router;
