import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";
import { HttpError } from "../types";

/**
 *
 * @param username The user-specific data to use in generating the token
 */
export function generateAccessToken(username: string) {
    return jwt.sign(username, process.env.TOKEN_SECRET!, {
        expiresIn: "1800s",
    });
}

/* JWT auth middleware */
export async function authenticateWithToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token

    // For now assume the token is just the user name lol
    try {
        const user = await User.findOne({ userName: token });
        if (user) {
            req.user = user;
        } else {
            throw new HttpError(
                404,
                "That user does not exist in the database."
            );
        }
    } catch (error) {
        next(error);
    }
    next();

    // TODO: Implement actual JWT auth
    // jwt.verify(
    //     token,
    //     process.env.ACCESS_TOKEN_SECRET as string,
    //     (err: any, user: any) => {
    //         console.log(err);
    //         if (err) return res.sendStatus(403);
    //         req.user = user;
    //         next(); // pass the execution off to whatever request the client intended
    //     }
    // );
}
