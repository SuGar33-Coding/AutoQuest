import { Router } from 'express';
import { createPog } from '../db/pog';
import { PoggerType } from '../models/Poggers';
const router = Router();

router.get('/hi', (req, res, next) => {
    res.send('hello');
});

router.post('/pog', async (req, res, next) => {
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