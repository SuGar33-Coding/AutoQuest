import config from "config";
require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import {OpenApiValidator} from 'express-openapi-validate';
import {Doc} from "./openapi";
const validator = new OpenApiValidator(Doc);

import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
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

/* Set up DB middleware */
const dbName = "auto-quest";
mongoose.connect(
    `mongodb+srv://the-mayor:${process.env.MONGO_PASSWORD}@tamanotchidb.6mz7m.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

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

/* Body parser */
app.use(bodyParser.json());

/* Set up OpenAPI validator */
// app.use(OpenApiValidator.middleware({
//     apiSpec: "../openapi.json",
//     validateRequests: true
// }))
app.use(validator.match());

/* Default route */
app.get("/", (req, res) => {
    req.session!.ctr ? req.session!.ctr++ : (req.session!.ctr = 1);

    res.send(`Why are you here? Shoo!
    Your permanent level penalty: ${req.session!.ctr * -1}`);
});

/* Set SwaggerUI route */
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(Doc))

/* Set api routes */
app.use("/", routes);

/* Invalid request response */
app.use((req, res, next) => {
    const error = new HttpError(404, "Not found");
    next(error);
});

/* Error handler */
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    // let error = res.locals.error;
    let status = error.status || 500;
    res.status(status).send({
        error: {
            message: error.message,
            status: status,
        },
    });
});

/* Spin up server */
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
