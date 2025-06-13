import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getDoctors, getPatients } from "../controller/user.controller.js";

const router = express.Router();

router.get("/doctors", protectRoute, getDoctors);
router.get("/patients", protectRoute, getPatients);

export default router;
