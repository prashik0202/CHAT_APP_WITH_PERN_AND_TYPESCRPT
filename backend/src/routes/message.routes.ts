import express, { Router } from "express";
import protectRoute from "../middleware/protectRoutes";
import { getMessages, getUserForSidebar, sendMessage } from "../controller/messsge.controller";

const router: Router = express.Router();

router.get("/conversation", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);


export default router;
