import { Router } from 'express';
import bodyParser from "body-parser";
import { createPog } from '../db/pog';
import { PoggerType } from '../models/Poggers';
const router = Router();

const jsonParser = bodyParser.json();

router.get('/hi', (req, res, next) => {
    res.send('hello');
});

router.post('/pog', jsonParser, async (req, res, next) => {
    console.log(req.body);

    let data: PoggerType = {
        pogVal: req.body.pogVal,
        pogName: req.body.pogName,
        pogSecret: req.body.pogSecret
    };

    const pogument = await createPog(data);
    res.send(pogument);
})

module.exports = router;