import * as dotenv from "dotenv";
dotenv.config();
import * as jwt from "jsonwebtoken";

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import * as OpenApiValidator from "express-openapi-validator";
import { Doc } from "./openapi";

import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import session from "express-session";
import routes from "./routes/index";

import morgan from "morgan";
import cors from "cors";
import { HttpError } from "./types";
import { User } from "./models/User";

/* Get Express app */
const app = express();

/* Logger */
app.use(morgan("dev"));

//TODO: Maybe implement bodyparser for sending json data through the API

/* Set up DB middleware */
mongoose
    .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(console.log);

/* Use sessions middleware */
app.use(
    session({
        name: "SID",
        secret: `I'm wearing three pairs of underwear right now`,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: true,
            secure: "auto", // TODO: set to true for production?
        },
    })
);

/* Add cors headers */
app.use(cors());

/* Body parser */
app.use(bodyParser.json());

/* Set up OpenAPI validator */
// app.use(
//     OpenApiValidator.middleware({
//         apiSpec: Doc,
//         validateRequests: true,
//     })
// );

/* Set SwaggerUI route */
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(Doc));

/* Default route */
app.get("/", (req, res) => {
    if (req.session) {
        // TODO: Make all session checks like this. It probably makes sense to do something if there is no session.
        req.session.ctr ? req.session.ctr++ : (req.session.ctr = 1);
    }

    res.send(`Why are you here? Shoo!
    Your permanent level penalty: ${req.session!.ctr * -1}`);
});

/* Set api routes */
app.use("/", routes);

/* Invalid request response */
app.use((req, res, next) => {
    const error = new HttpError(404, "Not found");
    next(error);
});

/* Error handler (requires next arg for Express to recognize it as the end chain) */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack);
    const status = error.status || 500;
    res.status(status).send({
        error: {
            message: error.message,
            status: status,
        },
    });
});

/* Spin up server */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
