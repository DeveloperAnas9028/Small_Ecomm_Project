import { Router } from "express";
import {
    getMeController,
    loginController,
    logoutController,
    refreshController,
    registerController
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerController);

router.post("/login", loginValidator, loginController);

router.post("/refresh-token", refreshController);

router.post("/me", authenticate, getMeController);

router.post("/logout", authenticate, logoutController);


export default router;