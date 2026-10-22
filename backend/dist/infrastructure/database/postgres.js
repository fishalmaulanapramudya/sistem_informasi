"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresPool = void 0;
exports.checkdatabaseConnection = checkdatabaseConnection;
const pg_1 = require("pg");
const env_1 = require("../../config/env");
exports.postgresPool = new pg_1.Pool({
    connectionString: env_1.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});
exports.postgresPool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error);
});
async function checkdatabaseConnection() {
    await exports.postgresPool.query("SELECT 1");
}
