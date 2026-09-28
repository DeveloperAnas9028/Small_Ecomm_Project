import express from "express";
import authRouter from "../routes/auth.route.js";
import productRouter from "../routes/product.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            // 1. Agar request me origin na ho (Postman, server-to-server) -> Allow
            if (!origin) return callback(null, true);

            // 2. Localhost allow karo
            if (origin.includes("localhost")) return callback(null, true);

            // 3. Vercel ka koi bhi URL ho (*.vercel.app) -> Sab allow honge
            if (origin.endsWith(".vercel.app")) return callback(null, true);

            // 4. CLIENT_URL env variable check
            if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
                return callback(null, true);
            }

            return callback(new Error("Blocked by CORS policy"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

export default app;