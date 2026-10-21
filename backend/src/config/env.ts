import "dotenv/config";

const required = [
    "DATABASE_URL",
    "JWT_SECRET",
    "FRONTEND_URL"
] as const;