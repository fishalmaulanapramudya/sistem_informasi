"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = __importDefault(require("./app"));
const postgres_1 = require("./infrastructure/database/postgres");
async function startServer() {
    try {
        await (0, postgres_1.checkdatabaseConnection)();
        console.log("Koneksi PostgreSQl berhasil");
        app_1.default.listen(env_1.env.PORT, () => {
            console.log('BACKEND LMS berjalan di http://localhost:${env.PORT}');
        });
    }
    catch (error) {
        console.log("Gagal menghubungkan PostreSQL", error);
        await postgres_1.postgresPool.end();
        process.exitCode = 1;
    }
}
void startServer;
