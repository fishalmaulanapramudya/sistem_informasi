import "dotenv/config";

const required = [
    "DATABASE_URL",
    "JWT_SECRET",
    "FRONTEND_URL"
] as const;

for (const key of required) {
    if (!process.env[key]) {
        throw new Error('Environment variable ${key} belum diatur.');
    }
}

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development", 
    PORT: Number(process.env.PORT ?? 8000),
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1h",
    FRONTEND_URL: process.env.FRONTEND_URL!
};