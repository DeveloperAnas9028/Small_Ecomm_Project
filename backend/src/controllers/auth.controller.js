import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js";

export async function registerController(req, res) {
    const { email, name, password } = req.body;

    const isUserAlreadyExists = await authModel.findOne({
        email
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User Already exists with this email address",
            errors: [
                {
                    path: "email",
                    msg: "User already exists with this email address"
                }
            ]
        });
    }

    const user = await authModel.create({
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12)
    });

    res.status(201).json({
        message: "User Registered Successfully",
        data: {
            email: user.email,
            name: user.name,
            id: user._id
        }
    });
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await authModel.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPassValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPassValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const accessToken = createAccessToken({
            userId: user._id,
        });

        const refreshToken = createRefreshToken({
            userId: user._id,
        });

        await authModel.findOneAndUpdate({
            email
        }, {
            refreshToken
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User LoggedIn Successfully",
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            },
            accessToken
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export async function refreshController(req, res) {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh Token not found",
            });
        }

        const decoded = readRefreshToken(refreshToken);
        const { userId } = decoded;

        const user = await authModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found, please log in again"
            });
        }

        if (refreshToken != user.refreshToken) {
            await authModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            });

            return res.status(403).json({
                message: "Refresh Token mismatch, please re-login"
            });
        }

        const accessToken = createAccessToken({ userId });
        const newRefreshToken = createRefreshToken({ userId });

        await authModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Tokens rotated successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        });

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refreshToken",
            error: error.message
        });
    }
}

export async function getMeController(req, res) {
    try {
        const { userId } = req.user;

        const user = await authModel.findById(userId);

        res.status(200).json({
            message: "User data fetched successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                }
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export async function logoutController(req, res) {
    try {
        const { userId } = req.user;

        await authModel.findByIdAndUpdate(userId, {
            refreshToken: null
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Logged Out Successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}