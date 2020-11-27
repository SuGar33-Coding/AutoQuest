declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            MONGO_PASSWORD: string;
            MONGO_URI: string;
            SECURE_SESSIONS: boolean;
            TOKEN_SECRET: string;
            PORT?: string;
        }
    }
}

export {};
