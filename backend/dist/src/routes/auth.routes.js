import express from "express";
import { login, logout, getUser, signup, } from "../controller/auth.controller.js";
import protectRoute from "../middleware/protectRoutes.js";
const router = express.Router();
router.get("/me", protectRoute, getUser);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
export default router;
