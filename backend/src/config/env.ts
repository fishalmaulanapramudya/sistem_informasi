import "dotenv/config";

const databaseUrl =
    process.env.DATABASE_URL ??
    `postgresql://${process.env.DB_USER ?? "postgres"}:${process.env.DB_PASSWORD ?? "postgres"}@${process.env.DB_HOST ?? "localhost"}:${process.env.DB_PORT ?? "5432"}/${process.env.DB_NAME ?? "postgres"}`;

const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
const jwtSecret = process.env.JWT_SECRET ?? "dev-secret-change-me";

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 3000),
    DATABASE_URL: databaseUrl,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1h",
    FRONTEND_URL: frontendUrl,
};