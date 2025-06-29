import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getDoctors,
  getPatient,
  getSummaries,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/doctors", protectRoute, getDoctors);
router.get("/patient/:id", protectRoute, getPatient);
router.get("/summaries", protectRoute, getSummaries);

export default router;
