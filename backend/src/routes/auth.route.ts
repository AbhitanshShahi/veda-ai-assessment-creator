import { Router } from "express";

import { signup, login, logout, me } from "../controllers/auth.controller.js";

import { protectRoute } from "../middlewares/protectRoute.middleware.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectRoute, me);

export default router;
