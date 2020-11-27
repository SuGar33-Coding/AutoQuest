import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

const jwtAuthThing: OpenAPIV3.SecurityRequirementObject = {
    jwtAuth: [],
};

export const Doc: OpenAPIV3.Document = {
    openapi: "3.0.2",
    info: {
        title: "AutoQuest API",
        version: "1.0",
    },
    servers: [{ url: "http://localhost:3000/" }],
    components: {
        securitySchemes: {
            jwtAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    tags: [
        {
            name: "auth",
            description: "Actions involving users and authentication",
        },
        {
            name: "character",
            description: "Get and update stats on a specific Character",
        },
        {
            name: "fun",
            description: "Testing probably",
        },
    ],
    paths: {
        "/fun/pog": {
            post: {
                tags: ["fun"],
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
                tags: ["auth"],
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
        "/character/level": {
            get: {
                tags: ["character"],
                responses: {
                    200: {
                        description: "Nice",
                    },
                    400: {
                        description: "There was an error, level not retrieved",
                    },
                    404: {
                        description: "Not found",
                    },
                },
                security: [
                    {
                        jwtAuth: [],
                    },
                ],
            },
        },
        "/character/num-actions": {
            get: {
                tags: ["character"],
                responses: {
                    200: {
                        description: "Nice",
                    },
                    400: {
                        description:
                            "There was an error, actions not retrieved",
                    },
                    404: {
                        description: "Not found",
                    },
                },
                security: [
                    {
                        jwtAuth: [],
                    },
                ],
            },
        },
    },
};
