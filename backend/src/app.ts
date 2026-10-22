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

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend LMS berjalan.",
        environment: env.NODE_ENV,
    });
});

app.get("/api/healts", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend LMS berjalan.",
        environment: env.NODE_ENV,
    });
});

export default app;