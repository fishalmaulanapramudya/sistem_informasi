import { env } from "./config/env";
import app from "./app";

import { checkdatabaseConnection, postgresPool } from "./infrastructure/database/postgres";

async function startServer():
Promise<void> {
    try {
        await checkdatabaseConnection();
        console.log("Koneksi PostgreSQl berhasil");

        app.listen(env.PORT, "0.0.0.0", () => {
            console.log(
                'BACKEND LMS berjalan di http://localhost:'+env.PORT,
            );
        });
    } catch (error) {
        console.log("Gagal menghubungkan PostreSQL", error);
        await postgresPool.end();
        process.exitCode = 1;
    }
}

void startServer();