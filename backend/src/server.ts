import { env } from "./config/env";
import app from "./app";

app.listen(env.PORT, () => {
    console.log(`Backend LMS berjalan di http://localhost:${env.PORT}`);
});