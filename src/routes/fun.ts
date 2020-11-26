import { Router } from "express";
import { createPog } from "../db/pog";
import { PoggerType } from "../models/Poggers";
const router = Router();

router.get("/hi", (req, res, next) => {
    res.send("hello");
});

router.post("/pog", async (req, res, next) => {
    console.log(req.query);

    const data: PoggerType = {
        pogVal: parseInt(req.query.pogVal as string),
        pogName: req.query.pogName as string,
        pogSecret: req.params.pogSecret,
    };

    // const pogument = await createPog(data);
    // res.send(pogument);
    res.send("nice");
});

module.exports = router;