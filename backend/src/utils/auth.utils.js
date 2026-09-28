import jwt from "jsonwebtoken"
import config from "../config/config.js";

export function createAccessToken({ userId }) {

    const accessToken = jwt.sign({ userId },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: "15Min" });

    return accessToken;
}

export function createRefreshToken({ userId }) {

    const refreshToken = jwt.sign({ userId },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: "7Days" });

    return refreshToken;
}

export function readAccessToken(accessToken) {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
}

export function readRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
}