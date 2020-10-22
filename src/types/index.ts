import { Request, Express } from "express"

export class HttpError extends Error {
    status: number;

    constructor(status: number, messgae?: string) {
        super(messgae);

        this.status = status;
    }
}