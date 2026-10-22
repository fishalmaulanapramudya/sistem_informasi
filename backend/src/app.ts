import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { env } from "./config/env";

const app = express();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const DEFAULT_ADMIN_PASSWORD_HASH = "$2b$10$oBqRCSjmW.LXVZdCU0yXnu042OZYWtLzsfTE.8/JC.Mk3jsco7stq";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? DEFAULT_ADMIN_PASSWORD_HASH;
const allowedOrigins = new Set(
    (process.env.FRONTEND_URL ?? env.FRONTEND_URL ?? "http://localhost:5173")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
);
allowedOrigins.add("http://localhost:5173");
allowedOrigins.add("http://127.0.0.1:5173");

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

function getTokenFromRequest(req: express.Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    const cookieToken = req.cookies?.token;
    return typeof cookieToken === "string" ? cookieToken : null;
}

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend LMS berjalan.",
        environment: env.NODE_ENV,
    });
});

app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username dan password wajib diisi.",
        });
    }

    const isValidUsername = username === ADMIN_USERNAME;
    const isValidPassword =
        String(password) === ADMIN_PASSWORD ||
        bcrypt.compareSync(String(password), ADMIN_PASSWORD_HASH);

    if (!isValidUsername || !isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Username atau password salah.",
        });
    }

    const payload = { username: ADMIN_USERNAME };
    const jwtSecret: Secret = env.JWT_SECRET;
    const jwtOptions: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    const token = jwt.sign(payload, jwtSecret, jwtOptions);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: "Login berhasil.",
        token,
        user: {
            username: ADMIN_USERNAME,
        },
    });
});

app.get("/api/auth/me", (req, res) => {
    const token = getTokenFromRequest(req);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token tidak ditemukan.",
        });
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { username?: string };

        return res.status(200).json({
            success: true,
            user: {
                username: decoded.username ?? ADMIN_USERNAME,
            },
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token tidak valid atau sudah kadaluarsa.",
        });
    }
});

app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout berhasil.",
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