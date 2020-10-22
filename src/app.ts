import config from "config";

import express from "express";
import session from "express-session";
import routes from "./routes/index";

import morgan from "morgan";
import cors from "cors";
import { HttpError } from "./types";

/* Get Express app */
const app = express();

/* Logger */
//app.use(morgan('dev'));

//TODO: Maybe implement bodyparser for sending json data through the API

/* Use sessions middleware */
app.use(
    session({
        name: "SID",
        secret: `I'm wearing three pairs of underwear right now`,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: true,
            secure: false, // TODO: set to true for production
        },
    })
);

/* Add cors headers */
app.use(cors());

/* Default route */
app.get("/", (req, res) => {
    req.session!.ctr ? req.session!.ctr++ : (req.session!.ctr = 1);

    res.send(`How did you get here? Shoo!
    Your permanent level penalty: ${req.session!.ctr * -1}`);
});

/* Set api routes */
app.use("/", routes);

/* Invalid request response */
// app.use((req, res, next) => {
//     const error = new HttpError(404, "Not found");
//     res.locals.error = error;
//     next(error);
// });

/* Error handler */
// app.use((req, res) => {
//     let error = res.locals.error;
//     let status = error.status || 500;
//     res.status(status).send({
//         error: {
//             message: error.message,
//             status: status,
//         },
//     });
// });

/* Spin up server */
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
