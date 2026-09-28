import express from "express";
import authRouter from "../routes/auth.route.js";
import productRouter from "../routes/product.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // React Vite ka exact origin
        credentials: true,               // Cookies pass allow karne ke liye
    })
);


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/products", productRouter);

export default app;