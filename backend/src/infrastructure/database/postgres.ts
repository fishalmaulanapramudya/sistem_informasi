import { Pool } from "pg";
import { env } from "../../config/env";

export const postgresPool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});

postgresPool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});

export async function checkdatabaseConnection():
Promise<void> {
    await postgresPool.query("SELECT 1;")
}