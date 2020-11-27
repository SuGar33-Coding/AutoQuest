import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

export const Doc: OpenAPIV3.Document = {
    openapi: "3.0.2",
    info: {
        title: "AutoQuest API",
        version: "1.0",
    },
    servers: [{ url: "http://localhost:3000/" }],
    paths: {
        "/fun/pog": {
            post: {
                parameters: [
                    {
                        name: "pogVal",
                        in: "query",
                        required: true,
                        schema: {
                            type: "number",
                        },
                    },
                    {
                        name: "pogName",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        name: "pogSecret",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Nice",
                    },
                    404: {
                        description: "Not found",
                    },
                },
            },
        },
        "/auth/signup": {
            post: {
                parameters: [
                    {
                        name: "userName",
                        in: "query",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Nice",
                    },
                    400: {
                        description:
                            "There was an error, the user was not created",
                    },
                    404: {
                        description: "Not found",
                    },
                },
            },
        },
    },
};
