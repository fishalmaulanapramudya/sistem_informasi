"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const DEFAULT_ADMIN_PASSWORD_HASH = "$2b$10$oBqRCSjmW.LXVZdCU0yXnu042OZYWtLzsfTE.8/JC.Mk3jsco7stq";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? DEFAULT_ADMIN_PASSWORD_HASH;
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
function getTokenFromRequest(req) {
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
        environment: env_1.env.NODE_ENV,
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
    const isValidPassword = String(password) === ADMIN_PASSWORD ||
        bcrypt_1.default.compareSync(String(password), ADMIN_PASSWORD_HASH);
    if (!isValidUsername || !isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Username atau password salah.",
        });
    }
    const payload = { username: ADMIN_USERNAME };
    const jwtSecret = env_1.env.JWT_SECRET;
    const jwtOptions = {
        expiresIn: env_1.env.JWT_EXPIRES_IN,
    };
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, jwtOptions);
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
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            user: {
                username: decoded.username ?? ADMIN_USERNAME,
            },
        });
    }
    catch (error) {
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
        environment: env_1.env.NODE_ENV,
    });
});
exports.default = app;
