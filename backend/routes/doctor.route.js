import express from "express";
import {
  getDoctors,
  getDoctorsBySpecialization,
} from "../controller/doctor.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getDoctors);
router.get("/:specialization", protectRoute, getDoctorsBySpecialization);

export default router;
