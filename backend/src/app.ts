import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

import { env } from "./config/env"

const app = express()

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/healts", (req, res) => {
    res.status(200).json({
        succes: true,
        message: "Backend LMS brjalan.",
        environment: env.NODE_ENV,
    });
});

export default app;